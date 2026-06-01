import { register } from "module";
import { login, refreshToken } from "../controllers/auth.controller";
import { registrationSchema, loginSchema, expSchema, bulkExpSchema } from "../middlewares/schemas";
import { validateRequest } from "../middlewares/validator.middlewares";
import express from 'express';
import { authenticateToken } from "../middlewares/auth.middleware";
import { createBulkExpenses, createExpense, deleteExpense, getExpenseListByUserId, updateExpense } from "../controllers/exp.controller";


export const expRoutes = express.Router();

expRoutes.post('/', authenticateToken, validateRequest(expSchema), createExpense);
expRoutes.post('/bulk', authenticateToken, validateRequest(bulkExpSchema), createBulkExpenses);
expRoutes.get('/', authenticateToken, getExpenseListByUserId);
expRoutes.delete('/:id', authenticateToken, deleteExpense);
expRoutes.put('/:id', authenticateToken, updateExpense);