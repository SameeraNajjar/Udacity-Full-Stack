import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../src/index';

const request = supertest(app);
const thumbDir = path.resolve(__dirname, '../images/thumb');

describe('API /api/images', () => {
  beforeAll(() => {
    if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });
  });

  it('returns 400 when params are missing', async () => {
    const res = await request.get('/api/images');
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid dimensions', async () => {
    const res = await request.get(
      '/api/images?filename=fjord&width=-1&height=200'
    );
    expect(res.status).toBe(400);
  });

  it('returns 404 for non-existent image', async () => {
    const res = await request.get(
      '/api/images?filename=doesnotexist&width=200&height=200'
    );
    expect(res.status).toBe(404);
  });

  it('returns 200 and serves an image for valid request', async () => {
    const res = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image');
  });

  it('uses cache on second request (same dimensions)', async () => {
    const res1 = await request.get(
      '/api/images?filename=fjord&width=220&height=180'
    );
    expect(res1.status).toBe(200);

    const cached = path.resolve(thumbDir, 'fjord_220x180.jpg');
    expect(fs.existsSync(cached)).toBeTrue();

    const stats1 = fs.statSync(cached);

    await request.get('/api/images?filename=fjord&width=220&height=180');

    const stats2 = fs.statSync(cached);
    expect(stats2.mtimeMs).toBe(stats1.mtimeMs);
  });
});
