"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../models/order");
const auth_1 = require("../middleware/auth");
const orderModel = new order_1.OrderModel();
const router = express_1.default.Router();
router.get('/', auth_1.verifyAuth, async (req, res) => {
    try {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin only.' });
        }
        const orders = await orderModel.index();
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/:id', auth_1.verifyAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const order = await orderModel.show(id);
        if (req.user?.role !== 'admin' && req.user?.userId !== order.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        res.json(order);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/', auth_1.verifyAuth, async (req, res) => {
    try {
        const order = {
            ...req.body,
            user_id: req.user?.userId
        };
        const newOrder = await orderModel.create(order);
        res.status(201).json(newOrder);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.put('/:id', auth_1.verifyAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const orderData = req.body;
        const existingOrder = await orderModel.show(id);
        if (req.user?.role !== 'admin' && req.user?.userId !== existingOrder.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const updatedOrder = await orderModel.update(id, orderData);
        res.json(updatedOrder);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.delete('/:id', auth_1.verifyAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const existingOrder = await orderModel.show(id);
        if (req.user?.role !== 'admin' && req.user?.userId !== existingOrder.user_id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const deletedOrder = await orderModel.delete(id);
        res.json(deletedOrder);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/user/:userId', auth_1.verifyAuth, async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        if (req.user?.role !== 'admin' && req.user?.userId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const orders = await orderModel.getUserOrders(userId);
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.patch('/:id/status', auth_1.verifyAuth, async (req, res) => {
    try {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin only.' });
        }
        const id = Number(req.params.id);
        const { status } = req.body;
        const updatedOrder = await orderModel.updateStatus(id, status);
        res.json(updatedOrder);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.default = router;
