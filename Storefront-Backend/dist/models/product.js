"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products: ${err.message}`);
        }
        finally {
            conn.release();
        }
    }
    async show(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM products WHERE id = $1';
            const result = await conn.query(sql, [id]);
            if (result.rows.length === 0) {
                throw new Error(`Product with id ${id} not found`);
            }
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}: ${err.message}`);
        }
        finally {
            conn.release();
        }
    }
    async create(p) {
        const conn = await database_1.default.connect();
        try {
            const sql = `
                INSERT INTO products (name, description, price, sku, stock, image_url) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING *
            `;
            const result = await conn.query(sql, [
                p.name,
                p.description || null,
                p.price,
                p.sku || null,
                p.stock || 0,
                p.image_url || null
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create product: ${err.message}`);
        }
        finally {
            conn.release();
        }
    }
    async update(id, p) {
        const conn = await database_1.default.connect();
        try {
            const sql = `
                UPDATE products 
                SET name = $1, description = $2, price = $3, sku = $4, 
                    stock = $5, image_url = $6, updated_at = NOW() 
                WHERE id = $7 
                RETURNING *
            `;
            const result = await conn.query(sql, [
                p.name,
                p.description || null,
                p.price,
                p.sku || null,
                p.stock || 0,
                p.image_url || null,
                id
            ]);
            if (result.rows.length === 0) {
                throw new Error(`Product with id ${id} not found`);
            }
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update product ${id}: ${err.message}`);
        }
        finally {
            conn.release();
        }
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [id]);
            if (result.rows.length === 0) {
                throw new Error(`Product with id ${id} not found`);
            }
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}: ${err.message}`);
        }
        finally {
            conn.release();
        }
    }
}
exports.ProductModel = ProductModel;
