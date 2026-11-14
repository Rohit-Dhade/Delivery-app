import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import authRouter from "./routes/AuthRoutes.ts";
import { errorHandler } from "./middlewares/ErrorhandlerMiddleware.ts";
import productRouter from "./routes/Product.Routes.ts";
import uploadRouter from "./routes/Upload.Data.Route.ts";
import orderRouter from "./routes/Order.Routes.ts";
import { serve } from "inngest/express";
import { inngest, functions } from './Inngest/index.ts'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('server is Live!')
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter)
app.use('/api/v1/upload', uploadRouter)
app.use('/api/v1/orders', orderRouter)
app.use("/api/v1/inngest", serve({ client: inngest, functions }));

app.use(errorHandler);

export default app;