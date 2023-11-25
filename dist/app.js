"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Local Imports
const user_route_1 = __importDefault(require("./app/modules/user/user.route"));
const app = (0, express_1.default)();
// Parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application Routes
app.use('/api/users', user_route_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to mongoose assignment server !');
});
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route Not Found!',
        error: {
            code: 404,
            description: `The route ${req.originalUrl} does not exist`,
        },
    });
});
exports.default = app;
