const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Adjust the path as necessary

// Route to get all products with pagination
router.get('/products', productController.getProducts);

router.post("/products",productController.addProduct);

// Route to get a single product by ID
router.get('/products/:productId', productController.getProduct);

// Route to update a product by ID
router.put('/products/:productId', productController.editProduct);

// Route to delete a product by ID
router.delete('/products/:productId', productController.deleteProduct);

module.exports = router;
