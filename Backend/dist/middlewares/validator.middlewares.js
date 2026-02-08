"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const interfaces_1 = require("../types/interfaces");
const validateRequest = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            next(new interfaces_1.ErrorWithStatus(error.message, 400));
        }
        next(new interfaces_1.ErrorWithStatus('Internal server error', 500));
    }
};
exports.validateRequest = validateRequest;
