import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';
import barangayPoster from '../../assets/barangay-poster.jpg';
import { ReactComponent as OfficialIcon } from '../../assets/official-icon.svg'; 

const carouselImages = [
  '/assets/carousel1.jpg',
  '/assets/carousel2.jpg',
  '/assets/carousel3.jpg'
];

const officials = [
  { name: 'Virginia V. Salenga' },
  { name: 'Kit H. Taguiang' },
  { name: 'Joseph E. Panes' },
  { name: 'Eric J. Carrianga' },
  { name: 'Maria Katrina P. Alicando' },
  { name: 'Enrico S. Evangelista' },
  { name: 'Danilo M. Abalos' },
  { name: 'Patricia Jhaye B. Jornales' }
];

const History = () => {
  return (
    <motion.div 
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Banner Image */}
      <motion.div 
        className="w-full h-64 overflow-hidden mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <img src={barangayPoster} alt="Barangay Poster" className="w-full h-full object-cover object-top" />
      </motion.div>
      
      {/* About Barangay Sta. Cruz */}
      <motion.div 
        className="flex flex-col md:flex-row mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="md:w-1/3 mb-4 md:mb-0">
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            {carouselImages.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`Carousel ${index}`} className="w-full h-48 object-cover" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="md:w-2/3 md:pl-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">About Barangay Sta. Cruz</h1>
          <p className="text-gray-800 mb-4 text-justify">
            Barangay Sta. Cruz is predominantly classified as residential area until the year 2000 when small and medium sized businesses began to be located in the barangay. In 2005, construction boom started for medium rise condominiums and apartelles. Barangay Sta. Cruz is within the jurisdiction of the First District of Makati and inclusive in the Cluster 3 or the Northwest Cluster. The Barangay is a 10-minute drive from the Makati Central Business District, prominent landmarks such as Makati Medical Center, Makati Central Fire Station and the Makati Central Police Station are also accessible by foot. Strategically located businesses more particularly at the corner of Pasong Tamo and Vito Cruz Streets, are supermarket, food chains and alike.
          </p>
        </div>
      </motion.div>

      {/* Mission and Vision */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Mission and Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Mission</h3>
            <p className="text-gray-800 text-justify">
              Guided by its Vision, Barangay Sta. Cruz will continue to endeavor towards disaster preparedness, generate opportunities for economic improvement, continue to instill appreciation for education and culture and deliver other necessary services for its constituents.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Vision</h3>
            <p className="text-gray-800 text-justify">
              We envision Barangay Sta. Cruz to be a disaster resilient, healthy, peace loving community with aspirations centered in the trust in God, whose officials and citizens have great value for education and cultural heritage and working together for the economic upliftment of a just and humane society.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Barangay Officials */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Barangay Officials</h2>
        <div className="flex flex-wrap justify-between">
          {officials.map((official, index) => (
            <motion.div 
              key={index} 
              className="w-1/2 md:w-1/4 p-2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <OfficialIcon className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />
              <p className="text-gray-800 font-semibold">{official.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default History;
