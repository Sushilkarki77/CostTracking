"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expRoutes = void 0;
const schemas_1 = require("../middlewares/schemas");
const validator_middlewares_1 = require("../middlewares/validator.middlewares");
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const exp_controller_1 = require("../controllers/exp.controller");
exports.expRoutes = express_1.default.Router();
exports.expRoutes.post('/', auth_middleware_1.authenticateToken, (0, validator_middlewares_1.validateRequest)(schemas_1.expSchema), exp_controller_1.createExpense);
exports.expRoutes.get('/', auth_middleware_1.authenticateToken, exp_controller_1.getExpenseListByUserId);
exports.expRoutes.delete('/:id', auth_middleware_1.authenticateToken, exp_controller_1.deleteExpense);
exports.expRoutes.put('/:id', auth_middleware_1.authenticateToken, exp_controller_1.updateExpense);
