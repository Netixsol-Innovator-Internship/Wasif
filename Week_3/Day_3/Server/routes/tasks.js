const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/taskController.js");
const validate = require("../middleware/validateTask.js");
const auth = require("../middleware/auth.js");

router.get("/", auth, ctrl.getAllTasks);
router.get("/task", auth, ctrl.getTask);
router.get("/:id", auth, ctrl.getTaskById);
router.post("/", auth, validate.validateCreateTask, ctrl.createTask);
router.put("/:id", auth, validate.validateUpdateTask, ctrl.updateTask);
router.delete("/:id", auth, ctrl.deleteTask);
router.get("/stats", auth, ctrl.getStats);

module.exports = router;