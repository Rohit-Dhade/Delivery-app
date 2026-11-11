import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import authRouter from "./routes/AuthRoutes.ts";
import { errorHandler } from "./middlewares/ErrorhandlerMiddleware.ts";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('server is Live!')
});

app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

export default app;