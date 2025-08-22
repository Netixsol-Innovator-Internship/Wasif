const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");
const { protect, isAdmin } = require("../middleware/auth");

// ✅ Normal user routes (require login)
router.get("/", protect, cartController.getCart);
router.post("/add", protect, cartController.addToCart);
router.put("/:itemId", protect, cartController.updateCartItem);
router.delete("/:itemId", protect, cartController.removeFromCart);

// ✅ Example of admin-only cart action (if needed in future)
// router.delete("/admin/:itemId", protect, isAdmin, cartController.adminRemoveFromCart);

module.exports = router;
