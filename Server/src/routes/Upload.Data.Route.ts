import { Router } from "express"
import AuthMiddleware from "../middlewares/AuthMiddleware.ts"
import { uploadImageController } from "../controller/UploadData.Controller.ts"
import { upload } from "../controller/UploadData.Controller.ts"

const uploadRouter = Router()

uploadRouter.post('/', AuthMiddleware, upload.single('image'), uploadImageController)

export default uploadRouter;