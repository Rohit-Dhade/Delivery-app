import { Request, Response } from "express";
import { prisma } from '../config/prisma.ts';
import bcrypt from 'bcrypt';
import { generateToken } from "../services/GenerateToken.ts";
import { getAdminStatus } from "../services/AdminStatus.ts";

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields" })
    }

    const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" })
    }

    const hashedpassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            name,
            email: email.toLowerCase(),
            password: hashedpassword
        }
    })

    const token = generateToken(user.id)
    const userData: any = { ...user };
    delete userData.password;

    userData.isAdmin = getAdminStatus(userData.email)

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
        user: userData, token
    })
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all fields" })
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() }, include: { addresses: true } })
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const token = generateToken(user.id)

    const userData: any = { ...user };
    delete userData.password;
    userData.isAdmin = getAdminStatus(userData.email)

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
        user: userData, token
    })
}