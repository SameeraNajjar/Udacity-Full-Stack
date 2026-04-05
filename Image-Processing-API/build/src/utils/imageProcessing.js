"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imagesDir = path_1.default.resolve(process.cwd(), 'images');
const thumbDir = path_1.default.resolve(imagesDir, 'thumb');
const processImage = async (filename, width, height) => {
    if (width <= 0 || height <= 0) {
        throw new Error('Invalid dimensions');
    }
    const inputPath = path_1.default.join(imagesDir, `${filename}.jpg`);
    const outputPath = path_1.default.join(thumbDir, `${filename}_${width}x${height}.jpg`);
    if (!fs_1.default.existsSync(inputPath)) {
        throw new Error('Image not found');
    }
    if (!fs_1.default.existsSync(thumbDir)) {
        fs_1.default.mkdirSync(thumbDir, { recursive: true });
    }
    if (fs_1.default.existsSync(outputPath)) {
        return outputPath;
    }
    await (0, sharp_1.default)(inputPath).resize(width, height).jpeg().toFile(outputPath);
    return outputPath;
};
exports.processImage = processImage;
//# sourceMappingURL=imageProcessing.js.map