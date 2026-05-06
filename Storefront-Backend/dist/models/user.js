"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
class UserModel {
    async create(u) {
        const conn = await database_1.default.connect();
        try {
            const hash = await bcrypt_1.default.hash(u.password, BCRYPT_ROUNDS);
            const sql = `
                INSERT INTO users (first_name, last_name, email, password_hash, role) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING id, first_name, last_name, email, role, created_at
            `;
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name || null,
                u.email,
                hash,
                u.role || 'customer'
            ]);
            return result.rows[0];
        }
        catch (err) {
            if (err.code === '23505') { // Unique violation
                throw new Error('Email already exists');
            }
            throw new Error(`Could not create user: ${err.message}`);
        }
        finally {
            conn.release();
        }
    }
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT id, first_name, last_name, email, role, created_at FROM users';
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users: ${err.message}`);
        }
        finally {
            conn.release();
        }
    }
    async show(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT id, first_name, last_name, email, role, created_at FROM users WHERE id = $1';
            const result = await conn.query(sql, [id]);
            if (result.rows.length === 0) {
                throw new Error(`User with id ${id} not found`);
            }
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}: ${err.message}`);
        }
        finally {
            conn.release();
        }
    }
    async authenticate(email, password) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT id, password_hash, role FROM users WHERE email = $1';
            const result = await conn.query(sql, [email]);
            if (result.rows.length === 0) {
                return null;
            }
            const user = result.rows[0];
            const match = await bcrypt_1.default.compare(password, user.password_hash);
            if (match) {
                const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
                const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: expiresIn });
                return token;
            }
            return null;
        }
        catch (err) {
            throw new Error(`Authentication error: ${err.message}`);
        }
        finally {
            conn.release();
        }
    }
}
exports.UserModel = UserModel;
