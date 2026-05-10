import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const imagesDir = path.resolve(process.cwd(), 'images');
const thumbDir = path.resolve(imagesDir, 'thumb');

export const processImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  if (width <= 0 || height <= 0) {
    throw new Error('Invalid dimensions');
  }

  const inputPath = path.join(imagesDir, `${filename}.jpg`);
  const outputPath = path.join(thumbDir, `${filename}_${width}x${height}.jpg`);

  if (!fs.existsSync(inputPath)) {
    throw new Error('Image not found');
  }

  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir, { recursive: true });
  }

  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  await sharp(inputPath).resize(width, height).jpeg().toFile(outputPath);
  return outputPath;
};
