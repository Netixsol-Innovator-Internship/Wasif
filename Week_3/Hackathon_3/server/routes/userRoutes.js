const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/auth");
const userController = require("../controllers/userController");

router.get("/", protect, isAdmin, userController.getAllUsers);

router.delete("/:id", protect, isAdmin, userController.deleteUser);

router.put("/:id/role", protect, isAdmin, userController.updateUserRole);

router.put("/:id/block", protect, isAdmin, userController.blockUser);
router.put("/:id/unblock", protect, isAdmin, userController.unblockUser);

module.exports = router;
