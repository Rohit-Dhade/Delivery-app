import express, { Router } from 'express'
import { login, register } from '../controller/Auth.Controller.ts';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;