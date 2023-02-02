const express = require('express');
const { addOrderItem, getMyOrders, getOrderById, updateOrderToPaid } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
//create new router
router.route('/').post(protect, addOrderItem);
router.route('/myorders').get(protect, getMyOrders);
//get order by id
router.route("/:id").get(protect, getOrderById);
//updateOrder
router.route("/:id/pay").put(protect, updateOrderToPaid);
module.exports = router;