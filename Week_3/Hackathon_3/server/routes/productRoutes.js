
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

router.get('/', productController.getAllProducts);
router.get('/filter-options', productController.getFilterOptions);
router.get('/:id', productController.getProductById);

module.exports = router;