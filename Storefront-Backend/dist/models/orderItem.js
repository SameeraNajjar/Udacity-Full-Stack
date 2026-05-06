"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderItemModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM order_items';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get order items: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `
        SELECT oi.*, p.name as product_name, p.image_url as product_image 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        WHERE oi.id = $1
      `;
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows.length === 0) {
                throw new Error(`Order item ${id} not found`);
            }
            const item = result.rows[0];
            return {
                ...item,
                total_price: item.quantity * item.unit_price
            };
        }
        catch (err) {
            throw new Error(`Could not find order item ${id}: ${err}`);
        }
    }
    async create(oi) {
        try {
            const conn = await database_1.default.connect();
            const sql = `
        INSERT INTO order_items (order_id, product_id, quantity, unit_price) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
      `;
            const result = await conn.query(sql, [
                oi.order_id,
                oi.product_id,
                oi.quantity,
                oi.unit_price
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create order item: ${err}`);
        }
    }
    async update(id, oi) {
        try {
            const conn = await database_1.default.connect();
            const sql = `
        UPDATE order_items 
        SET quantity = $1, unit_price = $2 
        WHERE id = $3 
        RETURNING *
      `;
            const result = await conn.query(sql, [
                oi.quantity,
                oi.unit_price,
                id
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update order item ${id}: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM order_items WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete order item ${id}: ${err}`);
        }
    }
    async getOrderItems(orderId) {
        try {
            const conn = await database_1.default.connect();
            const sql = `
        SELECT oi.*, p.name as product_name, p.image_url as product_image 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        WHERE oi.order_id = $1
      `;
            const result = await conn.query(sql, [orderId]);
            conn.release();
            return result.rows.map(item => ({
                ...item,
                total_price: item.quantity * item.unit_price
            }));
        }
        catch (err) {
            throw new Error(`Could not get order items for order ${orderId}: ${err}`);
        }
    }
}
exports.OrderItemModel = OrderItemModel;
