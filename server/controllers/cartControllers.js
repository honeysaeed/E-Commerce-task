// cartController.js

const CartItem = require('../models/cartItems');
// Add a product to the cart
const addToCart = async (req, res) => {
    try {
        const data = req.body;

        // Find the product in the cart, if it exists
        let existingCartItem = await CartItem.findOne({ id: data.id });

        if (!existingCartItem) {
            // If it's not in the cart, create a new cart item with default quantity of 1
            existingCartItem = new CartItem({
                id: data.id,
                title: data.title,
                description: data.description,
                price: data.price,
                discountPercentage: data.discountPercentage,
                rating: data.rating,
                stock: data.stock,
                brand: data.brand,
                category: data.category,
                thumbnail: data.thumbnail,
                images: data.images,
                quantity: 1,
            });
        } else {
            // If the item exists in the cart, only increase the quantity if it's within stock limits
            if (existingCartItem.quantity + 1 <= data.stock) {
                existingCartItem.quantity += 1;
            }
        }

        // Save or update the cart item
        await existingCartItem.save();

        // Return the updated cart or a success message
        const cartItems = await CartItem.find();
        res.status(201).json(cartItems);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding to the cart' });
    }
};

const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find({});
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error getting cart items:', error);
        res.status(500).json({ error: 'An error occurred while retrieving cart items' });
    }
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
    try {
        const itemId = req.params._id; // Assuming you send the item ID as a parameter

        // Find and remove the item from the cart
        const removedItem = await CartItem.findOneAndDelete({ _id: itemId });

        if (removedItem) {
            res.status(200).json({ message: 'Item removed from cart successfully' });
        } else {
            res.status(404).json({ message: 'Item not found in the cart' });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'An error occurred while removing the item from the cart' });
    }
};


module.exports = { addToCart, getAllCartItems, removeFromCart };
