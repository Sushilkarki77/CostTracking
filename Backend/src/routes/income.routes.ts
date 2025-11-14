import express from "express";

import {
    createIncomeItem,
    getIncomeListByUserId,
    deleteIncomeItem,
    updateIncomeItem
} from "../controllers/income.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validator.middlewares";
import { incomeSchema } from "../middlewares/schemas";

export const incomeRoutes = express.Router();

incomeRoutes.post('/', authenticateToken, validateRequest(incomeSchema), createIncomeItem);
incomeRoutes.get('/', authenticateToken, getIncomeListByUserId);
incomeRoutes.delete('/:id', authenticateToken, deleteIncomeItem);
incomeRoutes.put('/:id', authenticateToken, updateIncomeItem);
