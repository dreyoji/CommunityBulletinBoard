import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import EventCard from '../EventCard';
import barangayPoster from '../../assets/barangay-poster.jpg';
import barangayCityHall from '../../assets/barangay-city-hall.jpg';

const LandingPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      // Sort events by date in descending order
      const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="p-4">
      {/* Barangay poster image placeholder */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <img src={barangayPoster} alt="Barangay Poster" className="w-full rounded-lg shadow-lg" />
      </motion.div>

      {/* Sta. Cruz Latest Events */}
      <div className="mb-8">
        <motion.div
          className="flex justify-between items-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold">Sta. Cruz Latest Events</h1>
          <div className="flex space-x-4">
            <Link to="/local-events" className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 font-semibold">View All</Link>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Display top 3 latest events */}
          {events.slice(0, 3).map((event, index) => (
            <EventCard key={event._id} event={event} index={index} />
          ))}
        </div>
      </div>

      {/* Brief History of Barangay Sta. Cruz */}
      <motion.div
        className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-4 flex justify-center">
            <img src={barangayCityHall} alt="Barangay City Hall" className="w-full h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md" />
          </div>
          <div className="md:w-2/3 w-full">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Barangay Sta. Cruz</h1>
            <p className="text-gray-800 mb-4 italic">
              Located at Zapote Street, cor. Davila Street<br/>
              8804-1343 / 8896-8775
            </p>
            <p className="text-gray-800 mb-4 text-justify">
              Barangay Sta. Cruz is predominantly classified as residential area until the year 2000 when small and medium sized businesses began to be located in the barangay. In 2005, construction boom started for medium rise condominiums and apartelles. Barangay Sta. Cruz is within the jurisdiction of the First District of Makati and inclusive in the Cluster 3 or the Northwest Cluster. The Barangay is a 10-minute drive from the Makati Central Business District, prominent landmarks such as Makati Medical Center, Makati Central Fire Station and the Makati Central Police Station are also accessible by foot. Strategically located businesses more particularly at the corner of Pasong Tamo and Vito Cruz Streets, are supermarket, food chains and alike.
            </p>
            <div className="flex justify-end">
              <Link to="/history" className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 font-semibold">Read more</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;