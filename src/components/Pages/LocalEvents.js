import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import EventCard from '../EventCard';
import { useAuth } from '../../context/AuthContext';

const LocalEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    img: '',
    title: '',
    date: '',
    description: '',
    link: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, isAdmin, isLoggedIn } = useAuth();

  // Fetch events from backend on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/events');

      // Sort events by date descending
      const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEvents(sortedEvents);
      setError(null);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewEvent({
      ...newEvent,
      img: file,
    });
  };

  // Handle adding a new event
  const handleAddEvent = async () => {
    const formData = new FormData();
    formData.append('img', newEvent.img);
    formData.append('title', newEvent.title);
    formData.append('date', newEvent.date);
    formData.append('description', newEvent.description);
    formData.append('link', newEvent.link);

    try {
      const response = await axios.post('/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Event added successfully:', response.data);
      fetchEvents();
      setNewEvent({
        img: '',
        title: '',
        date: '',
        description: '',
        link: '',
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Function to handle deleting an event
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Event deleted successfully:', response.data);
      fetchEvents(); // Refresh events after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-10 text-gray-900 text-center">Loading...</h1>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-10 text-red-600 text-center">{error}</h1>
      </div>
    );
  }

  // Render normal state
  return (
    <motion.div
      className="p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-10 text-gray-900 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        Local Events
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add Event Form - ONLY ADMIN*/}
        {isLoggedIn() && isAdmin() && (
          <div className="col-span-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Add New Event</h2>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="text"
                  name="date"
                  value={newEvent.date}
                  onChange={handleChange}
                  required
                  placeholder="Format: Month Day, Year"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="text"
                  name="link"
                  value={newEvent.link}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display existing events */}
        {events.map((event, index) => (
          <div key={event._id} className="relative">
            <div className="bg-white rounded-lg overflow-hidden p-4">
              <EventCard event={event} index={index} />
              
              {isLoggedIn() && isAdmin() && (
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(event._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer font-bold"
                >
                  &#x2715;
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LocalEvents;