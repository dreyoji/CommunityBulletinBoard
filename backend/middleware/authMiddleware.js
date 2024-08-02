const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual JWT secret

const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);

    // Find user by ID from token payload
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Authorization denied, not an admin' });
    }

    // Add user from payload to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;