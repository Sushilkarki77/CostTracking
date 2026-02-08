"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validator_middlewares_1 = require("../middlewares/validator.middlewares");
const schemas_1 = require("../middlewares/schemas");
exports.authRoutes = express_1.default.Router();
exports.authRoutes.post('/register', (0, validator_middlewares_1.validateRequest)(schemas_1.registrationSchema), auth_controller_1.register);
exports.authRoutes.post('/login', (0, validator_middlewares_1.validateRequest)(schemas_1.loginSchema), auth_controller_1.login);
exports.authRoutes.post('/refresh-token', auth_controller_1.refreshToken);
