"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const interfaces_1 = require("../types/interfaces");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res, next) => {
    try {
        const user = req.body;
        if (!user?.email || !user?.password) {
            throw new interfaces_1.ErrorWithStatus('email and password are required', 400);
        }
        if (user.password.length < 6) {
            throw new interfaces_1.ErrorWithStatus('password must be of length 6', 401);
        }
        const existingUser = await (0, user_model_1.findUserByEmail)(user.email);
        if (existingUser) {
            throw new interfaces_1.ErrorWithStatus('User already exists', 400);
        }
        const { email, fullname } = await (0, user_model_1.createUser)(user);
        res.status(201).json({
            message: 'user created successfully!',
            data: { email, fullname },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new interfaces_1.ErrorWithStatus('email and password are required', 400);
        }
        const user = await (0, user_model_1.findUserByEmail)(email);
        if (!user || !user.email) {
            throw new interfaces_1.ErrorWithStatus('User Does not exists', 401);
        }
        if (!user.password) {
            throw new interfaces_1.ErrorWithStatus('User is not active', 401);
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new interfaces_1.ErrorWithStatus('Invalid credentials', 401);
        }
        const tokenPayload = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
        };
        if (!process.env.SECRET_KEY || !process.env.SECRET_KEY_REFRESH)
            throw new interfaces_1.ErrorWithStatus('Internal server Error!', 500);
        const accessToken = getAccessToken(tokenPayload, process.env.SECRET_KEY);
        const refreshToken = getRefreshToken(tokenPayload, process.env.SECRET_KEY_REFRESH);
        res.json({
            message: 'Login Successful!',
            data: { accessToken, refreshToken },
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.login = login;
const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            throw new interfaces_1.ErrorWithStatus('Refresh token is required', 400);
        }
        if (!process.env.SECRET_KEY || !process.env.SECRET_KEY_REFRESH)
            throw new interfaces_1.ErrorWithStatus('Internal server Error!', 500);
        const claim = jsonwebtoken_1.default.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
        const user = await (0, user_model_1.findUserByEmail)(claim.email);
        if (!user || !user.email || !user.isActive) {
            throw new interfaces_1.ErrorWithStatus('User Does not exists', 401);
        }
        const tokenPayload = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
        };
        const accessToken = getAccessToken(tokenPayload, process.env.SECRET_KEY);
        res.json({
            message: 'Token refreshed',
            data: { accessToken, refreshToken },
        });
    }
    catch (error) {
        next(new interfaces_1.ErrorWithStatus('Token expired', 401));
    }
};
exports.refreshToken = refreshToken;
const getAccessToken = (tokenPayload, secret) => jsonwebtoken_1.default.sign(tokenPayload, secret, { expiresIn: '1h' });
const getRefreshToken = (tokenPayload, secret) => jsonwebtoken_1.default.sign(tokenPayload, secret, { expiresIn: '1d' });
