const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    images: {
        type: [String], // An array of image URLs
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
