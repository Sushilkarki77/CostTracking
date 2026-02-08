"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = exports.incomeSchema = exports.expSchema = exports.documentSchema = exports.tokenRefreshSchema = exports.loginSchema = exports.registrationSchema = void 0;
const zod_1 = require("zod");
exports.registrationSchema = zod_1.z.object({
    fullname: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    isActive: zod_1.z.boolean().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.tokenRefreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string(),
});
exports.documentSchema = zod_1.z.object({
    documentName: zod_1.z.string(),
});
exports.expSchema = zod_1.z.object({
    name: zod_1.z.string(),
    paymentMethod: zod_1.z.string(),
    date: zod_1.z.string(),
    note: zod_1.z.string().optional(),
    items: zod_1.z.array(zod_1.z.object({
        currency: zod_1.z.string(),
        name: zod_1.z.string(),
        price: zod_1.z.number(),
        category: zod_1.z.object({
            name: zod_1.z.string(),
            _id: zod_1.z.string()
        }),
    }))
});
exports.incomeSchema = zod_1.z.object({
    name: zod_1.z.string(),
    amount: zod_1.z.string(),
    currency: zod_1.z.string(),
    date: zod_1.z.string(),
    note: zod_1.z.string().optional()
});
exports.categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Category name is required")
});
