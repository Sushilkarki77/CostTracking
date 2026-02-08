"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_middlewares_1 = require("../middlewares/validator.middlewares");
const category_controller_1 = require("../controllers/category.controller");
const schemas_1 = require("../middlewares/schemas");
exports.categoryRoutes = express_1.default.Router();
exports.categoryRoutes.post('/', auth_middleware_1.authenticateToken, (0, validator_middlewares_1.validateRequest)(schemas_1.categorySchema), category_controller_1.createNewCategory);
exports.categoryRoutes.get('/', auth_middleware_1.authenticateToken, category_controller_1.getAllCategories);
exports.categoryRoutes.put('/:id', auth_middleware_1.authenticateToken, (0, validator_middlewares_1.validateRequest)(schemas_1.categorySchema), category_controller_1.updateCategoryById);
exports.categoryRoutes.delete('/:id', auth_middleware_1.authenticateToken, category_controller_1.deleteCategoryById);
