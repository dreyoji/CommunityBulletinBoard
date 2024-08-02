const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected Route: POST /events (only accessible to admins)
router.post('/events', authMiddleware, upload.single('img'), eventController.addEvent);

// Protected Route: DELETE /events/:id (only accessible to admins)
router.delete('/events/:id', authMiddleware, eventController.deleteEvent);

// Public Route: GET /events (accessible to all users)
router.get('/events', eventController.getAllEvents);

module.exports = router;