"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./auth.routes");
const exception_handler_1 = require("../handlers/exception.handler");
const exp_routes_1 = require("./exp.routes");
const category_routes_1 = require("./category.routes");
const income_routes_1 = require("./income.routes");
const router = express_1.default.Router();
router.use('/api/auth', auth_routes_1.authRoutes);
router.use('/api/exp', exp_routes_1.expRoutes);
router.use('/api/cat', category_routes_1.categoryRoutes);
router.use('/api/income', income_routes_1.incomeRoutes);
router.use(exception_handler_1.routNotFound);
router.use(exception_handler_1.errorHandler);
exports.default = router;
