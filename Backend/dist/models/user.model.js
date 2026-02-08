"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.updateUser = exports.createUser = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
(0, mongoose_1.pluralize)(null);
const userSchema = new mongoose_1.Schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password)
        return next();
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.UserModel = (0, mongoose_1.model)('user', userSchema);
const createUser = async (user) => {
    const userModel = new exports.UserModel({ ...user });
    return await userModel.save();
};
exports.createUser = createUser;
const updateUser = async (_id, user) => {
    return await exports.UserModel.findByIdAndUpdate(_id, { $set: user }, { new: true, select: '-password -_id -__v' });
};
exports.updateUser = updateUser;
const findUserByEmail = async (email) => {
    return await exports.UserModel.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
