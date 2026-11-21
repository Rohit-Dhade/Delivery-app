import { Request, Response } from "express";
import { prisma } from "../config/prisma.ts";
import bcrypt from 'bcrypt';
import { ApiError } from "../services/ApiError.ts";

export const getAdminStats = async (req: Request, res: Response) => {
    const [totalOrders, totalUsers, totalProducts, outofStock, totalPartners, recentOrders] = await Promise.all([

        prisma.order.count({
            where: { NOT: [{ paymentMethod: "card", isPaid: false }] }
        }),

        prisma.user.count(),
        prisma.product.count(),
        prisma.product.count({ where: { stock: 0 } }),
        prisma.deliveryPartner.count(),
        prisma.order.findMany({
            where: { NOT: [{ paymentMethod: "card", isPaid: false }] },
            orderBy: { createdAt: "desc" },
            include: { user: { select: { name: true, email: true } }, deliveryPartner: { select: { name: true, phone: true } } },
            take: 8
        })
    ])

    res.status(200).json({
        totalOrders, totalUsers, totalProducts, outofStock, totalPartners, recentOrders
    })
}

export const getDeliveryPartner = async (req: Request, res: Response) => {
    const partners = await prisma.deliveryPartner.findMany(
        { orderBy: { createdAt: "desc" } }
    )

    res.json({ partners })
}

export const createDeliveryPartner = async (req: Request, res: Response) => {
    const { name, email, password, phone, vehicleType } = req.body;

    if (!name || !email || !password || !phone) {
        res.status(400).json({
            message: "Please provide all required fields"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const partner = await prisma.deliveryPartner.create({
        data: {
            name, email: email.toLowerCase(), password: hashPassword, phone, vehicleType
        }
    })

    res.status(201).json({
        partner
    })
}

export const updateDeliveryPartner = async (req: Request, res: Response) => {
    const { name, phone, vehicleType, isActive } = req.body;

    const data: any = {}

    if (name) data.name = name;
    if (phone) data.phone = phone;
    if (vehicleType) data.vehicleType = vehicleType;
    if (isActive) data.isActive = isActive;

    try {
        const partner = await prisma.deliveryPartner.update({
            where: { id: req.params.id as string },
            data
        })

        res.json({ partner })
    } catch (err) {
        throw new ApiError(404, "Deliver partner not found")
    }
}

export const assignDeliveryPartner = async (req: Request, res: Response) => {
    const { partnerId } = req.body;

    const order = await prisma.order.findUnique({
        where: { id: req.params.id as string }
    })

    const partner = await prisma.deliveryPartner.findUnique({
        where: { id: partnerId }
    })

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    let status = order!.status

    const history: any[] = Array.isArray(order!.statusHistory) ? order!.statusHistory : [];

    if (order!.status === "Placed" || order!.status === "Confirmed") {
        status = "Assigned",
            history.push({
                status: "Assigned",
                note: `Assigned to ${partner!.name}`, timestamp: new Date()
            })
    }

    await prisma.order.update({
        where: { id: order!.id },
        data: { deliveryPartnerId: partner!.id, deliveryOtp: otp, statusHistory: history }
    })

    res.json({
        order
    })
}

