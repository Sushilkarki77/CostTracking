import express from 'express';
import { authenticateToken } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validator.middlewares";
import { createNewCategory, deleteCategoryById, getAllCategories, updateCategoryById } from '../controllers/category.controller';
import { categorySchema } from '../middlewares/schemas';

export const categoryRoutes = express.Router();

categoryRoutes.post('/', authenticateToken, validateRequest(categorySchema), createNewCategory);
categoryRoutes.get('/', authenticateToken, getAllCategories);
categoryRoutes.put('/:id', authenticateToken, validateRequest(categorySchema), updateCategoryById);
categoryRoutes.delete('/:id', authenticateToken, deleteCategoryById);
