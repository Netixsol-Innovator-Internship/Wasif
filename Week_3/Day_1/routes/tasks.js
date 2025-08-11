const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/taskController.js");
const validate = require("../middleware/validateTask.js");

router.get("/", ctrl.getAllTasks);
router.get("/task", ctrl.getTask);
router.get("/:id", ctrl.getTaskById);
router.post("/", validate.validateCreateTask, ctrl.createTask);
router.put("/:id", validate.validateUpdateTask, ctrl.updateTask);
router.delete("/:id", ctrl.deleteTask);
router.get("/stats", ctrl.getStats);

module.exports = router;
