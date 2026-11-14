import { Router } from "express";
import { getFlashDeals, getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controller/Product.Controller.ts";
import AuthMiddleware from "../middlewares/AuthMiddleware.ts";
import admin from "../middlewares/Admin.ts";

const productRouter = Router();

productRouter.get('/flash-deals', getFlashDeals)
productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)
productRouter.post('/', AuthMiddleware, admin, createProduct)
productRouter.put("/:id", AuthMiddleware, admin, updateProduct)
productRouter.delete("/:id", AuthMiddleware, admin, deleteProduct)

export default productRouter