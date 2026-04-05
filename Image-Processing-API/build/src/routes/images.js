"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageProcessing_1 = require("../utils/imageProcessing");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const { filename, width, height } = req.query;
    if (!filename) {
        res.status(400).send('Missing required parameter: filename');
        return;
    }
    if (!width || !height) {
        res.status(400).send('Missing required parameters: width and/or height');
        return;
    }
    const w = Number(width);
    const h = Number(height);
    if (!Number.isFinite(w) || !Number.isFinite(h)) {
        res.status(400).send('Width and height must be valid numbers');
        return;
    }
    if (w <= 0 || h <= 0) {
        res.status(400).send('Width and height must be positive numbers');
        return;
    }
    try {
        const outputPath = await (0, imageProcessing_1.processImage)(String(filename), w, h);
        res.status(200).sendFile(outputPath);
    }
    catch (err) {
        const message = err.message || 'Unknown error';
        if (message.toLowerCase().includes('not found')) {
            res.status(404).send(message);
            return;
        }
        res.status(500).send(`Internal error: ${message}`);
    }
});
exports.default = router;
//# sourceMappingURL=images.js.map