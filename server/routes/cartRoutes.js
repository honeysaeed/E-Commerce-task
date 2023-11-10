// routes/cartRoutes.js
const express = require('express');
const { addToCart, getAllCartItems, removeFromCart } = require('../controllers/cartControllers');
const router = express.Router();
// Replace with the actual path to your cart controller


router.post('/add-to-cart', addToCart);

// Get all items in the cart
router.get('/cart', getAllCartItems);

// Remove an item from the cart by ID
router.delete('/cart/:_id', removeFromCart);
module.exports = router;
