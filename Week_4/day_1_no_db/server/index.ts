import express, { Request, Response } from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import { Task, CreateTaskDto, UpdateTaskDto } from "./types.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? 5000;

// In-memory store
const tasks: Task[] = [];

// GET /api/tasks
app.get("/api/tasks", (_req: Request, res: Response) => {
  res.json(tasks);
});


// POST /api/tasks
app.post("/api/tasks", (req: Request<{}, {}, CreateTaskDto>, res: Response) => {
  const { title } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }
  const task: Task = {
    id: uuid(),
    title: title.trim(),
    completed: false,
    createdAt: Date.now()
  };
  tasks.unshift(task);
  res.status(201).json(task);
});

// PUT /api/tasks/:id
app.put("/api/tasks/:id", (req: Request<{ id: string }, {}, UpdateTaskDto>, res: Response) => {
  const { id } = req.params;
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ message: "Task not found" });

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
app.delete("/api/tasks/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ message: "Task not found" });
  const [removed] = tasks.splice(idx, 1);
  res.json(removed);
});

// app.listen(PORT, () => {
//   console.log(`API listening on http://localhost:${PORT}`);
// });

export default app;
