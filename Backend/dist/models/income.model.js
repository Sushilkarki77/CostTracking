"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIncomeListByUserId = exports.deleteIncome = exports.updateIncome = exports.seedIncome = exports.createIncome = exports.IncomeModel = void 0;
const mongoose_1 = require("mongoose");
const incomeSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: String, required: true },
    currency: { type: String, required: true },
    date: { type: String, required: true },
    note: { type: String }
}, { timestamps: true });
exports.IncomeModel = (0, mongoose_1.model)('income', incomeSchema);
const createIncome = async (income) => {
    const incomeModel = new exports.IncomeModel({ ...income });
    return await incomeModel.save();
};
exports.createIncome = createIncome;
const seedIncome = async (incomes) => {
    return await exports.IncomeModel.insertMany(incomes);
};
exports.seedIncome = seedIncome;
const updateIncome = async (userId, _id, income) => {
    return await exports.IncomeModel.findOneAndUpdate({ userId, _id }, { $set: income }, { new: true, lean: true });
};
exports.updateIncome = updateIncome;
const deleteIncome = async (_id, userId) => {
    return await exports.IncomeModel.findOneAndDelete({ _id, userId });
};
exports.deleteIncome = deleteIncome;
const findIncomeListByUserId = async (userId) => {
    return await exports.IncomeModel.find({ userId }).sort({ createdAt: -1 });
};
exports.findIncomeListByUserId = findIncomeListByUserId;
