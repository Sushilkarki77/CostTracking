"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findExplistByuserId = exports.deleteExp = exports.updateExp = exports.seedExp = exports.createExp = exports.ExpModel = void 0;
const mongoose_1 = require("mongoose");
const expSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    note: { type: String },
    items: [
        {
            currency: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            category: {
                _id: { type: String },
                name: { type: String }
            }
        }
    ]
}, { timestamps: true });
exports.ExpModel = (0, mongoose_1.model)('exp', expSchema);
const createExp = async (exp) => {
    const expModel = new exports.ExpModel({ ...exp });
    return await expModel.save();
};
exports.createExp = createExp;
const seedExp = async (exps) => {
    return await exports.ExpModel.insertMany(exps);
};
exports.seedExp = seedExp;
const updateExp = async (userId, _id, exp) => {
    return await exports.ExpModel.findOneAndUpdate({ userId, _id }, { $set: exp }, { new: true, lean: true });
};
exports.updateExp = updateExp;
const deleteExp = async (_id, userId) => {
    return await exports.ExpModel.findOneAndDelete({ _id, userId });
};
exports.deleteExp = deleteExp;
const findExplistByuserId = async (userId) => {
    return await exports.ExpModel.find({ userId }).sort({ createdAt: -1 });
};
exports.findExplistByuserId = findExplistByuserId;
