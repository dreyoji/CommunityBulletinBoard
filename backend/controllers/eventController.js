const Event = require('../models/Event');

// GET all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// NEW event with image
const addEvent = async (req, res) => {
  try {
    const { title, date, description, link } = req.body;

    const newEvent = new Event({
      img: {
        data: req.file.buffer, 
        contentType: req.file.mimetype 
      },
      title,
      date,
      description,
      link
    });

    // Save the event to MongoDB
    await newEvent.save();

    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Failed to add event' });
  }
};

// DELETE an event
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find the event by ID and delete it
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully', event: deletedEvent });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

module.exports = {
  addEvent,
  deleteEvent,
  getAllEvents
};
