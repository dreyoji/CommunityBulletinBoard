import React from 'react';
import { motion } from 'framer-motion';

const EventCard = ({ event, index }) => {
  // Function to convert Buffer to Base64 URL
  const bufferToBase64 = (buffer) => {
    // Convert Buffer to Base64 string
    const binary = btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    // Create data URL
    return `data:${event.img.contentType};base64,${binary}`;
  };

  return (
    <motion.a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-lg overflow-hidden shadow-lg block hover:shadow-xl transition-shadow duration-300 w-full h-[25rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Display image if img.data exists */}
      {event.img.data && (
        <img
          src={bufferToBase64(event.img.data.data)}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{event.title}</h2>
        <p className="text-gray-600 mb-2">{event.date}</p>
        <p className="text-gray-800">{event.description}</p>
      </div>
    </motion.a>
  );
};

export default EventCard;