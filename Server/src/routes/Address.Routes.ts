import { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.ts";
import { addAddress, deleteAddress, getAddress, updateAddress } from "../controller/Address.Controller.ts";

const addressRouter = Router()

addressRouter.get('/', AuthMiddleware, getAddress);
addressRouter.post('/', AuthMiddleware, addAddress)
addressRouter.put("/:id", AuthMiddleware, updateAddress)
addressRouter.delete('/:id', AuthMiddleware, deleteAddress)

export default addressRouter;