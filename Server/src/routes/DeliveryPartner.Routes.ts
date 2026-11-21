import { Router } from "express";
import { cancelDelivery, completeDelivery, getMyDeliveries, getMyDelivery, loginPartner, updateDeliveryStatus, updateLocation } from "../controller/DeliveryPartner.controller.ts";
import deliveryAuth from "../middlewares/Delivery.auth.ts";

const deliveryPartnerRouter = Router()

deliveryPartnerRouter.post('/login', loginPartner)
deliveryPartnerRouter.get('/my-deliveries', deliveryAuth, getMyDeliveries)
deliveryPartnerRouter.get('/my-deliveries/:id', deliveryAuth, getMyDelivery)
deliveryPartnerRouter.put('/my-deliveries/:id/complete', deliveryAuth, completeDelivery)
deliveryPartnerRouter.put('/my-deliveries/:id/cancel', deliveryAuth, cancelDelivery)
deliveryPartnerRouter.put('/my-deliveries/:id/status', deliveryAuth, updateDeliveryStatus)
deliveryPartnerRouter.put('/my-deliveries/:id/location', deliveryAuth, updateLocation)

export default deliveryPartnerRouter;