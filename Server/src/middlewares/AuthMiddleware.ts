import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../services/ApiError.ts";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }

        req.user = { id: decoded.id };
        next()
    } catch (err) {
        if (err instanceof ApiError) {
            return next(err)
        }

        return next(new ApiError(401, "Token is not valid"))
    }
}

export default AuthMiddleware;