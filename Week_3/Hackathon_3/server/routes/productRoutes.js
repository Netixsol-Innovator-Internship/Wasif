const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const { protect, isAdmin } = require("../middleware/auth");


router.get("/", productController.getAllProducts);
router.get("/filter-options", productController.getFilterOptions);
router.get("/:id", productController.getProductById);


router.post("/", protect, isAdmin, productController.addProduct);
router.put("/:id", protect, isAdmin, productController.updateProduct);
router.delete("/:id", protect, isAdmin, productController.deleteProduct);

module.exports = router;
