const express = require('express');
const router = express.Router();
const { register, login, getUsers, deleteUser, updateUserRole } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route: POST /api/register
router.post('/register', register);

// Route: POST /api/login
router.post('/login', login);

// Protected route: GET /api/users (only accessible to admins)
router.get('/users', authMiddleware, getUsers);

// Protected route: DELETE /api/users/:id (only accessible to admins)
router.delete('/users/:id', authMiddleware, deleteUser);

// Protected route: PUT /api/users/:id/role (only accessible to admins)
router.put('/users/:id/role', authMiddleware, updateUserRole);

module.exports = router;