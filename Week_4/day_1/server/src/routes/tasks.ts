import express from "express";
import * as ctrl from "../controllers/taskController";
import { validateCreateTask, validateUpdateTask } from "../middleware/validateTask";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", auth, ctrl.getAllTasks);
router.get("/task", auth, ctrl.getTask);
router.get("/:id", auth, ctrl.getTaskById);
router.post("/", auth, validateCreateTask, ctrl.createTask);
router.put("/:id", auth, validateUpdateTask, ctrl.updateTask);
router.delete("/:id", auth, ctrl.deleteTask);
router.get("/stats", auth, ctrl.getStats);

export default router;
