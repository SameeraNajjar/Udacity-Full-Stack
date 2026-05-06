"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderItem_1 = require("../models/orderItem");
const auth_1 = require("../middleware/auth");
const order_1 = require("../models/order");
const orderItemModel = new orderItem_1.OrderItemModel();
const orderModel = new order_1.OrderModel();
const router = express_1.default.Router();
router.get('/', auth_1.verifyAuth, async (req, res) => {
    try {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin only.' });
        }
        const orderItems = await orderItemModel.index();
        res.json(orderItems);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/:id', auth_1.verifyAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const orderItem = await orderItemModel.show(id);
        const order = await orderModel.show(orderItem.order_id);
        if (req.user?.role !== 'admin' && req.user?.userId !== order.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        res.json(orderItem);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/', auth_1.verifyAuth, async (req, res) => {
    try {
        const orderItem = req.body;
        const order = await orderModel.show(orderItem.order_id);
        if (req.user?.role !== 'admin' && req.user?.userId !== order.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const newOrderItem = await orderItemModel.create(orderItem);
        res.status(201).json(newOrderItem);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.put('/:id', auth_1.verifyAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const orderItemData = req.body;
        const existingItem = await orderItemModel.show(id);
        const order = await orderModel.show(existingItem.order_id);
        if (req.user?.role !== 'admin' && req.user?.userId !== order.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const updatedOrderItem = await orderItemModel.update(id, orderItemData);
        res.json(updatedOrderItem);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.delete('/:id', auth_1.verifyAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const existingItem = await orderItemModel.show(id);
        const order = await orderModel.show(existingItem.order_id);
        if (req.user?.role !== 'admin' && req.user?.userId !== order.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const deletedOrderItem = await orderItemModel.delete(id);
        res.json(deletedOrderItem);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/order/:orderId', auth_1.verifyAuth, async (req, res) => {
    try {
        const orderId = Number(req.params.orderId);
        const order = await orderModel.show(orderId);
        if (req.user?.role !== 'admin' && req.user?.userId !== order.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const orderItems = await orderItemModel.getOrderItems(orderId);
        res.json(orderItems);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
