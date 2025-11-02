
import express from 'express';

import { login, refreshToken, register } from '../controllers/auth.controller';


export const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/refresh-token', refreshToken);
