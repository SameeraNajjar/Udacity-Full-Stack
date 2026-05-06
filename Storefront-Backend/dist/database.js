"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/database.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const { DB_HOST = 'localhost', DB_PORT = '5432', DB_NAME = 'storefront_dev', DB_USER = 'postgres', DB_PASSWORD = 'postgres', NODE_ENV } = process.env;
const database = NODE_ENV === 'test' ? (process.env.DB_NAME_TEST || 'storefront_test') : DB_NAME;
const pool = new pg_1.Pool({
    host: DB_HOST,
    port: Number(DB_PORT),
    database,
    user: DB_USER,
    password: DB_PASSWORD,
});
exports.default = pool;
