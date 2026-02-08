"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const user_model_1 = require("../models/user.model");
const interfaces_1 = require("../types/interfaces");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            throw new interfaces_1.ErrorWithStatus('Access Denied', 401);
        }
        if (!process.env.SECRET_KEY) {
            throw new interfaces_1.ErrorWithStatus('Internal server error', 500);
        }
        const verified = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = await (0, user_model_1.findUserByEmail)(verified.email);
        if (!user) {
            throw new interfaces_1.ErrorWithStatus('User Does not Exist', 401);
        }
        req.user = verified;
        next();
    }
    catch (error) {
        if (error instanceof interfaces_1.ErrorWithStatus) {
            next(error);
        }
        else {
            next(new interfaces_1.ErrorWithStatus('Invalid Token', 401));
        }
    }
};
exports.authenticateToken = authenticateToken;
