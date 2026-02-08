"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCategoryById = exports.findAllCategories = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true }
}, { timestamps: true });
exports.CategoryModel = (0, mongoose_1.model)('category', categorySchema);
const createCategory = async (category) => {
    const categoryModel = new exports.CategoryModel({ ...category });
    return await categoryModel.save();
};
exports.createCategory = createCategory;
const updateCategory = async (_id, userId, category) => {
    return await exports.CategoryModel.findByIdAndUpdate({ _id, userId }, { $set: category }, { new: true });
};
exports.updateCategory = updateCategory;
const deleteCategory = async (_id, userId) => {
    return await exports.CategoryModel.findOneAndDelete({ _id, userId });
};
exports.deleteCategory = deleteCategory;
const findAllCategories = async (userId) => {
    return await exports.CategoryModel.find({ userId }, { __v: 0 });
};
exports.findAllCategories = findAllCategories;
const findCategoryById = async (_id) => {
    return await exports.CategoryModel.findById(_id);
};
exports.findCategoryById = findCategoryById;
