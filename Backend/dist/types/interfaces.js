"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorWithStatus = void 0;
class ErrorWithStatus extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}
exports.ErrorWithStatus = ErrorWithStatus;
