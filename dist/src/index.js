"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const AppError_1 = __importDefault(require("./errors/AppError"));
require("./entity");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use((err, request, response, _) => {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, () => {
    console.log('🚀🚀🚀🚀 Server started', 3333);
});
