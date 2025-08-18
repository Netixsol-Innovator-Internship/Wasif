"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT ?? 5000;
// In-memory store
const tasks = [];
// GET /api/tasks
app.get("/api/tasks", (_req, res) => {
    res.json(tasks);
});
// POST /api/tasks
app.post("/api/tasks", (req, res) => {
    const { title } = req.body || {};
    if (!title || !title.trim()) {
        return res.status(400).json({ message: "Title is required" });
    }
    const task = {
        id: (0, uuid_1.v4)(),
        title: title.trim(),
        completed: false,
        createdAt: Date.now()
    };
    tasks.unshift(task);
    res.status(201).json(task);
});
// PUT /api/tasks/:id
app.put("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1)
        return res.status(404).json({ message: "Task not found" });
    const payload = req.body || {};
    if (payload.title !== undefined) {
        if (!payload.title.trim()) {
            return res.status(400).json({ message: "Title cannot be empty" });
        }
        tasks[idx].title = payload.title.trim();
    }
    if (payload.completed !== undefined) {
        tasks[idx].completed = !!payload.completed;
    }
    res.json(tasks[idx]);
});
// DELETE /api/tasks/:id
app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1)
        return res.status(404).json({ message: "Task not found" });
    const [removed] = tasks.splice(idx, 1);
    res.json(removed);
});
// app.listen(PORT, () => {
//   console.log(`API listening on http://localhost:${PORT}`);
// });
exports.default = app;
