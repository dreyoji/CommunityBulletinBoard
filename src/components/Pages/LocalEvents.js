import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { events as initialEvents } from '../../data/events'; 
import EventCard from '../EventCard'; 

const LocalEvents = () => {
  const [events, setEvents] = useState(initialEvents); // State to hold events
  const [newEvent, setNewEvent] = useState({
    img: '/assets/default-event.jpg', // Default image path
    title: '',
    date: '',
    description: '',
    link: ''
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent({
          ...newEvent,
          img: reader.result // Set image preview
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle adding a new event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.description && newEvent.link) {
      setEvents([...events, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date)));
      setNewEvent({
        img: '/assets/default-event.jpg', // Reset to default image path
        title: '',
        date: '',
        description: '',
        link: ''
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

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
        {/* New event form */}
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
        {/* Display existing events */}
        {events.map((event, index) => (
          <EventCard key={index} event={event} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default LocalEvents;