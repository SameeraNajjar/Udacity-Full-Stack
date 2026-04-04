"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../src/index"));
const request = (0, supertest_1.default)(index_1.default);
const thumbDir = path_1.default.resolve(__dirname, '../images/thumb');
describe('API /api/images', () => {
    beforeAll(() => {
        if (!fs_1.default.existsSync(thumbDir))
            fs_1.default.mkdirSync(thumbDir, { recursive: true });
    });
    it('returns 400 when params are missing', async () => {
        const res = await request.get('/api/images');
        expect(res.status).toBe(400);
    });
    it('returns 400 for invalid dimensions', async () => {
        const res = await request.get('/api/images?filename=fjord&width=-1&height=200');
        expect(res.status).toBe(400);
    });
    it('returns 404 for non-existent image', async () => {
        const res = await request.get('/api/images?filename=doesnotexist&width=200&height=200');
        expect(res.status).toBe(404);
    });
    it('returns 200 and serves an image for valid request', async () => {
        const res = await request.get('/api/images?filename=fjord&width=200&height=200');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toContain('image');
    });
    it('uses cache on second request (same dimensions)', async () => {
        const res1 = await request.get('/api/images?filename=fjord&width=220&height=180');
        expect(res1.status).toBe(200);
        const cached = path_1.default.resolve(thumbDir, 'fjord_220x180.jpg');
        expect(fs_1.default.existsSync(cached)).toBeTrue();
        const stats1 = fs_1.default.statSync(cached);
        await request.get('/api/images?filename=fjord&width=220&height=180');
        const stats2 = fs_1.default.statSync(cached);
        expect(stats2.mtimeMs).toBe(stats1.mtimeMs);
    });
});
//# sourceMappingURL=apiSpec.js.map