import express, { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.ts";
import { createOrder, getAllOrders, getOrder, getOrderLocation, getUserOrders, udpdateOrderstatus } from "../controller/Orders.Controllers.ts";
import admin from "../middlewares/Admin.ts";

const orderRouter = Router();

orderRouter.post('/', AuthMiddleware, createOrder);
orderRouter.get('/', AuthMiddleware, getUserOrders);
orderRouter.get('/all', AuthMiddleware, admin, getAllOrders);
orderRouter.get('/:id', AuthMiddleware, getOrder);
orderRouter.get('/:id/location', AuthMiddleware, getOrderLocation);
orderRouter.get('/:id/status', AuthMiddleware, admin, udpdateOrderstatus)

export default orderRouter;