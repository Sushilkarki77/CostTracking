
import express from 'express';

import { login, refreshToken, register } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validator.middlewares';
import { loginSchema, registrationSchema } from '../middlewares/schemas';


export const authRoutes = express.Router();

authRoutes.post('/register', validateRequest(registrationSchema), register);
authRoutes.post('/login', validateRequest(loginSchema), login);
authRoutes.post('/refresh-token', refreshToken);
