require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(express.json());
// Set up middleware
app.use(cors()); // Enable CORS for all routes

mongoose.connect(process.env.mongoDBURL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('===============Connected to the database=================');
});

// Define your routes
const cartRoutes = require('./routes/cartRoutes');
// Add more routes as needed

// Use the routes
app.use('/api', cartRoutes);
// Add more route prefixes as needed

// Define a default route

// Start the Express server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
