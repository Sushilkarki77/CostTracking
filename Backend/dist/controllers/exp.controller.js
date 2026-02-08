"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.createExpense = exports.getExpenseListByUserId = void 0;
const interfaces_1 = require("../types/interfaces");
const exp_model_1 = require("../models/exp.model");
const getExpenseListByUserId = async (req, res, next) => {
    try {
        const user = req.user;
        const expList = (await (0, exp_model_1.findExplistByuserId)(user._id)) ?? [];
        res.status(200).json({ data: expList });
    }
    catch (error) {
        next(error);
    }
};
exports.getExpenseListByUserId = getExpenseListByUserId;
const createExpense = async (req, res, next) => {
    try {
        const user = req.user;
        const expObj = req.body;
        const createdItem = await (0, exp_model_1.createExp)({ ...expObj, userId: user._id });
        res.status(200).json({ data: createdItem });
    }
    catch (error) {
        next(error);
    }
};
exports.createExpense = createExpense;
const updateExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const expObj = req.body;
        const updatedItem = await (0, exp_model_1.updateExp)(user._id, id, expObj);
        if (!updatedItem)
            throw new interfaces_1.ErrorWithStatus("Item does not exist", 404);
        res.status(200).json({ message: "Expense updated successfully", data: { ...updatedItem } });
    }
    catch (error) {
        next(error);
    }
};
exports.updateExpense = updateExpense;
const deleteExpense = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const deletedItem = await (0, exp_model_1.deleteExp)(id, user._id);
        if (!deletedItem)
            throw new interfaces_1.ErrorWithStatus("Item does not exist", 404);
        res.status(200).json({ message: "Expense deleted successfully", data: { deletedItem } });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteExpense = deleteExpense;
