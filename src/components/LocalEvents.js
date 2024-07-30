// src/components/LocalEvents.js
import React from 'react';
import { motion } from 'framer-motion';
import { events } from '../data/events'; 
import EventCard from './EventCard'; 

const LocalEvents = () => {
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
        {events.map((event, index) => (
          <EventCard key={index} event={event} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default LocalEvents;
