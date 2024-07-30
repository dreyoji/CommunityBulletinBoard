import React from 'react';
import { motion } from 'framer-motion';

const hotlines = [
  { name: 'Emergency Hotline', contact: '117' },
  { name: 'Barangay Hall', contact: '(02) 8804-1343' },
  { name: 'Police Station', contact: '(02) 8962-1234' },
  { name: 'Fire Department', contact: '(02) 8945-6789' },
  { name: 'Health Center', contact: '(02) 8912-3456' },
];

const directories = [
  {
    category: 'Health Services',
    items: [
      { name: 'Barangay Sta. Cruz Health Center', contact: '(02) 8912-3456' },
      { name: 'Makati Medical Center', contact: '(02) 8888-8999' },
    ],
  },
  {
    category: 'Utilities',
    items: [
      { name: 'Electric Company', contact: '(02) 8111-2222' },
      { name: 'Water Company', contact: '(02) 8222-3333' },
    ],
  },
  {
    category: 'Education',
    items: [
      { name: 'Sta. Cruz Elementary School', contact: '(02) 8333-4444' },
      { name: 'Makati High School', contact: '(02) 8444-5555' },
    ],
  },
  {
    category: 'Local Government',
    items: [
      { name: 'Barangay Sta. Cruz Hall', contact: '(02) 8804-1343' },
      { name: 'Makati City Hall', contact: '(02) 8999-6666' },
    ],
  },
];

const Directory = () => {
  return (
    <motion.div 
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 text-gray-900 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        Barangay Sta. Cruz Directory
      </motion.h1>

      {/* Hotlines */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Emergency Hotlines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotlines.map((hotline, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900">{hotline.name}</h3>
              <p className="text-gray-700">{hotline.contact}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Directories */}
      {directories.map((directory, index) => (
        <motion.div 
          key={index} 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">{directory.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {directory.items.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.name}</h3>
                <p className="text-gray-700">{item.contact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Directory;
