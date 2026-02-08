"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const income_controller_1 = require("../controllers/income.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_middlewares_1 = require("../middlewares/validator.middlewares");
const schemas_1 = require("../middlewares/schemas");
exports.incomeRoutes = express_1.default.Router();
exports.incomeRoutes.post('/', auth_middleware_1.authenticateToken, (0, validator_middlewares_1.validateRequest)(schemas_1.incomeSchema), income_controller_1.createIncomeItem);
exports.incomeRoutes.get('/', auth_middleware_1.authenticateToken, income_controller_1.getIncomeListByUserId);
exports.incomeRoutes.delete('/:id', auth_middleware_1.authenticateToken, income_controller_1.deleteIncomeItem);
exports.incomeRoutes.put('/:id', auth_middleware_1.authenticateToken, income_controller_1.updateIncomeItem);
