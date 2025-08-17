const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");
const auth  = require("../middleware/auth");

router.get("/", auth, cartController.getCart);
router.post("/add", auth, cartController.addToCart);
router.put("/:itemId", auth, cartController.updateCartItem);
router.delete("/:itemId", auth, cartController.removeFromCart);

module.exports = router;
