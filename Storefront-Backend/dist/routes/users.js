"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const auth_1 = require("../middleware/auth");
const userModel = new user_1.UserModel();
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const created = await userModel.create(req.body);
        const token = await userModel.authenticate(req.body.email, req.body.password);
        res.status(201).json({ user: created, token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.post('/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userModel.authenticate(email, password);
        if (!token)
            return res.status(401).json({ error: 'Invalid credentials' });
        res.json({ token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.get('/', auth_1.verifyAuth, async (req, res) => {
    try {
        const users = await userModel.index();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/:id', auth_1.verifyAuth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await userModel.show(id);
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
