const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/taskController.js");
const validate = require("../middleware/validateTask.js");
const auth = require("../middleware/auth.js");

router.get("/stats", auth, ctrl.getStats);         // static
router.get("/task", auth, ctrl.getTask);          // static
router.get("/", auth, ctrl.getAllTasks);          // static
router.get("/:id", auth, ctrl.getTaskById);       // param
router.post("/", auth, validate.validateCreateTask, ctrl.createTask);
router.put("/:id", auth, validate.validateUpdateTask, ctrl.updateTask);
router.delete("/:id", auth, ctrl.deleteTask);


module.exports = router;