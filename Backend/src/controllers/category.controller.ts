import { RequestHandler } from "express";
import { ResponseItem } from "../types/interfaces";
import { CategoryDocument, createCategory, deleteCategory, updateCategory, findAllCategories, findCategoryById } from "../models/category.model";


export const getAllCategories: RequestHandler<unknown, ResponseItem<CategoryDocument[]>> = async (req, res, next) => {
    try {
        const categories: CategoryDocument[] = (await findAllCategories()) ?? [];
        res.status(200).json({ data: categories });
    } catch (error) {
         next(error);
    }
};


export const getCategoryById: RequestHandler<{ id: string }, ResponseItem<CategoryDocument | null>> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category: CategoryDocument | null = await findCategoryById(id);
        if (!category)  res.status(404).json({ message: "Category not found" });
        res.status(200).json({ data: category });
    } catch (error) {
         next(error);
    }
};


export const createNewCategory: RequestHandler<unknown, ResponseItem<CategoryDocument>, CategoryDocument> = async (req, res, next) => {
    try {
        const categoryObj = req.body;
        const createdCategory: CategoryDocument = await createCategory(categoryObj);
        res.status(200).json({ data: createdCategory });
    } catch (error) {
         next(error);
    }
};


export const updateCategoryById: RequestHandler<{ id: string }, ResponseItem<{ updatedItem: CategoryDocument | null }>, CategoryDocument> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoryObj = req.body;
        const updatedItem: CategoryDocument | null = await updateCategory(id, categoryObj);
        if (!updatedItem)  res.status(404).json({ message: "Category does not exist" });
        res.status(200).json({ message: "Category updated successfully", data: { updatedItem } });
    } catch (error) {
         next(error);
    }
};


export const deleteCategoryById: RequestHandler<{ id: string }, ResponseItem<{ deletedItem: CategoryDocument | null }>> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedItem: CategoryDocument | null = await deleteCategory(id);
        if (!deletedItem)  res.status(404).json({ message: "Category does not exist" });
        res.status(200).json({ message: "Category deleted successfully", data: { deletedItem } });
    } catch (error) {
         next(error);
    }
};
