const express = require('express')
const router = express.Router()

const productController = require('../components/products/ProductController');

//additional
router.get('/report/:page',productController.getProductsByPage)

//CRUD
router.get('/', productController.getProductsByPage);
router.get('/:id',productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

module.exports = router