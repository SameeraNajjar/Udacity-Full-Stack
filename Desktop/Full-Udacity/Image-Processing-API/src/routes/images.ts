import express, { Request, Response } from 'express';
import { processImage } from '../utils/imageProcessing';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
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
    const outputPath = await processImage(String(filename), w, h);
    res.status(200).sendFile(outputPath);
  } catch (err) {
    const message = (err as Error).message || 'Unknown error';
    if (message.toLowerCase().includes('not found')) {
      res.status(404).send(message);
      return;
    }
    res.status(500).send(`Internal error: ${message}`);
  }
});

export default router;
