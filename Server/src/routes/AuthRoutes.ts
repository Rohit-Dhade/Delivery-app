import express, { Router } from 'express'
import { login, register } from '../controller/AuthController.ts';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;