const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual JWT secret

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    user = new User({ name, email, password });

    // Hash password before saving to database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        email: user.email // Add any other user details as needed
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error('Error in user login:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Get all users (protected route)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete user by ID (protected route)
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateUserRole = async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;
  
  try {
    // Retrieve the user making the request
    const requester = req.user; // This assumes req.user is populated by authMiddleware

    // Check if requester is an admin
    if (requester.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can update user roles.' });
    }

    // Retrieve the user to be updated
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update role to 'admin' or 'user' based on input
    if (role !== 'admin' && role !== 'user') {
      return res.status(400).json({ message: 'Invalid role provided' });
    }
    
    userToUpdate.role = role;
    await userToUpdate.save();

    res.json(userToUpdate);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  updateUserRole,
};