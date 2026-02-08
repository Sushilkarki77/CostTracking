"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routNotFound = exports.errorHandler = void 0;
const interfaces_1 = require("../types/interfaces");
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const status = err instanceof interfaces_1.ErrorWithStatus ? err.status : 500;
    res.status(status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
const routNotFound = (req, res) => {
    res.status(404).json({
        message: 'Route not found',
    });
};
exports.routNotFound = routNotFound;
