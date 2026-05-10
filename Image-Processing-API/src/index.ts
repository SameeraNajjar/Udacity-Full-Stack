import express from 'express';
import path from 'path';
import imagesRouter from './routes/images';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send(
    'Image Processing API is running. Try /api/images?filename=fjord&width=300&height=300'
  );
});

app.use('/api/images', imagesRouter);

app.use('/thumb', express.static(path.resolve(__dirname, '../images/thumb')));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
