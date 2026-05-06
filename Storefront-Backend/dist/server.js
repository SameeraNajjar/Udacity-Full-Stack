"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const products_1 = __importDefault(require("./routes/products"));
const orders_1 = __importDefault(require("./routes/orders"));
const orderItems_1 = __importDefault(require("./routes/orderItems"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const address = `0.0.0.0:${port}`;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Storefront API is running!');
});
app.use('/users', users_1.default);
app.use('/products', products_1.default);
app.use('/orders', orders_1.default);
app.use('/order-items', orderItems_1.default);
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
