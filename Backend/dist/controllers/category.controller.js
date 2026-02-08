"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryById = exports.updateCategoryById = exports.createNewCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const category_model_1 = require("../models/category.model");
const mongodb_1 = require("mongodb");
const getAllCategories = async (req, res, next) => {
    try {
        const user = req.user;
        const categories = (await (0, category_model_1.findAllCategories)(user._id)) ?? [];
        res.status(200).json({ data: categories });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await (0, category_model_1.findCategoryById)(id);
        if (!category)
            res.status(404).json({ message: "Category not found" });
        res.status(200).json({ data: category });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoryById = getCategoryById;
const createNewCategory = async (req, res, next) => {
    try {
        const user = req.user;
        const categoryObj = req.body;
        const createdCategory = await (0, category_model_1.createCategory)({ ...categoryObj, userId: user._id });
        res.status(200).json({ data: createdCategory });
    }
    catch (error) {
        next(error);
    }
};
exports.createNewCategory = createNewCategory;
const updateCategoryById = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const categoryObj = req.body;
        const updatedItem = await (0, category_model_1.updateCategory)(id, user._id, categoryObj);
        if (!updatedItem)
            res.status(404).json({ message: "Category does not exist" });
        res.status(200).json({ message: "Category updated successfully", data: { updatedItem } });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const deletedItem = await (0, category_model_1.deleteCategory)(new mongodb_1.ObjectId(id), user._id);
        if (!deletedItem)
            res.status(404).json({ message: "Category does not exist" });
        res.status(200).json({ message: "Category deleted successfully", data: { deletedItem } });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCategoryById = deleteCategoryById;
