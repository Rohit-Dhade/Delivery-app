import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.ts";
import { ApiError } from "../services/ApiError.ts";

const storage = multer.memoryStorage();
export const upload = multer({ storage })

export const uploadImageController = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No image file is provided"
            })
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64")
        const dataURI = "data:" + req.file.mimetype + ";base64" + b64;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "grocery-del",
            resource_type: "auto",
        })

        res.json({ url: result.secure_url })
    } catch (error) {
        throw new ApiError(500, "Error while uploading an image to cloudinary")
    }
}