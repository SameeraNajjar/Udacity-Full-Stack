"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const images_1 = __importDefault(require("./routes/images"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (_req, res) => {
    res.send('Image Processing API is running. Try /api/images?filename=fjord&width=300&height=300');
});
app.use('/api/images', images_1.default);
app.use('/thumb', express_1.default.static(path_1.default.resolve(__dirname, '../images/thumb')));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map