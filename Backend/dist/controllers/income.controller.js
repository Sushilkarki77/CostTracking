"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIncomeItem = exports.updateIncomeItem = exports.createIncomeItem = exports.getIncomeListByUserId = void 0;
const interfaces_1 = require("../types/interfaces");
const income_model_1 = require("../models/income.model");
const getIncomeListByUserId = async (req, res, next) => {
    try {
        const user = req.user;
        const incomeList = (await (0, income_model_1.findIncomeListByUserId)(user._id)) ?? [];
        res.status(200).json({ data: incomeList });
    }
    catch (error) {
        next(error);
    }
};
exports.getIncomeListByUserId = getIncomeListByUserId;
const createIncomeItem = async (req, res, next) => {
    try {
        const user = req.user;
        const incomeObj = req.body;
        const createdItem = await (0, income_model_1.createIncome)({ ...incomeObj, userId: user._id });
        res.status(200).json({ data: createdItem });
    }
    catch (error) {
        next(error);
    }
};
exports.createIncomeItem = createIncomeItem;
const updateIncomeItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const incomeObj = req.body;
        const updatedItem = await (0, income_model_1.updateIncome)(user._id, id, incomeObj);
        if (!updatedItem)
            throw new interfaces_1.ErrorWithStatus("Item does not exist", 404);
        res.status(200).json({ message: "Income updated successfully", data: { ...updatedItem } });
    }
    catch (error) {
        next(error);
    }
};
exports.updateIncomeItem = updateIncomeItem;
const deleteIncomeItem = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const deletedItem = await (0, income_model_1.deleteIncome)(id, user._id);
        if (!deletedItem)
            res.status(404).json({ message: "Item does not exist" });
        res.status(200).json({ message: "Income deleted successfully", data: { deletedItem } });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteIncomeItem = deleteIncomeItem;
