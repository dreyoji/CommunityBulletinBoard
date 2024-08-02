const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Routes
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB(); // Connect to MongoDB

// Define routes
app.use('/api', userRoutes); // Prefix all user-related routes with /api

// Start server
const PORT = process.env.PORT || 3000; // Use port 3000 if PORT is not specified in .env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});