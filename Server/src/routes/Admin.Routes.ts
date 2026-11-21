import { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.ts";
import admin from "../middlewares/Admin.ts";
import { assignDeliveryPartner, createDeliveryPartner, getAdminStats, getDeliveryPartner, updateDeliveryPartner } from "../controller/Admin.Controller.ts";

const adminRouter = Router()

adminRouter.get('/stats', AuthMiddleware, admin, getAdminStats);
adminRouter.get('/delivery-partners', AuthMiddleware, admin, getDeliveryPartner)
adminRouter.post('/deliver-partners', AuthMiddleware, admin, createDeliveryPartner)
adminRouter.put('/delivery-partners/:id', AuthMiddleware, admin, updateDeliveryPartner)
adminRouter.put('/orders/:id/assign', AuthMiddleware, admin, assignDeliveryPartner)

export default adminRouter;