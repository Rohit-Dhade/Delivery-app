import { NextFunction, Request, Response } from "express";
import { prisma } from '../config/prisma.ts'
import { ApiError } from "../services/ApiError.ts";

const admin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const user = await prisma.user.findUnique({ where: { id: userId } })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase()) : []

        if (adminEmails.includes(user.email.toLowerCase())) {
            if (req.user) req.user.isAdmin = true;
            next()
        } else {
            res.status(403).json({
                message: "Admin verification required"
            })
        }

    } catch (err: any) {
        throw new ApiError(500, "Admin verification failed")
    }
}

export default admin;