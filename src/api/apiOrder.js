const express = require('express')
const router = express.Router()

const orderController = require('../components/orders/OrderController');

// additional
router.post('/items/add',orderController.addItemOrder);
router.delete('/items/:id',orderController.removeItemOrder)
router.get('/items/:id',orderController.getItemsOrder)

router.post('/process/:id',orderController.processOrder)
router.get('/report/:page',orderController.getOrdersByPage)

//CRUD
router.get('/',orderController.getOrdersByPage);
router.get('/:id',orderController.getOrder);
router.post('/',orderController.createOrder);
router.put('/:id',orderController.updateOrder);
router.delete('/:id',orderController.deleteOrder);

module.exports = router