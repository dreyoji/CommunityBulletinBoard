import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Map */}
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold mb-2">Barangay Sta. Cruz</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7723.135069486692!2d121.01312145921396!3d14.566705943427356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9a6e378bcb7%3A0xbbce544bd1134425!2sSanta%20Cruz%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sus!4v1722604363486!5m2!1sen!2sus" referrerpolicy="no-referrer-when-downgrade"
            width="100%"
            height="200"
            allowFullScreen=""
            loading="lazy"
            className="border-0 mb-2"
            title="Sta. Cruz Makati Map"
          ></iframe>
        </div>

        {/* Office Location */}
        <div className="flex flex-col items-start space-y-2">
          <h2 className="text-lg font-semibold mb-2">Office Location</h2>
          <p>
            <strong>Address:</strong> Zapote Street, cor. Davila Street, Sta. Cruz, Makati, Metro Manila, Philippines
          </p>
          <p>
            <strong>Phone:</strong> 8804-1343 / 8896-8775
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:info@stacruzmakati.ph" className="text-blue-300">info@stacruzmakati.ph</a>
          </p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-start space-y-2">
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <a
            href="https://www.facebook.com/stacruzmakatiofficials"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400"
          >
            Official Facebook Page
          </a>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} Barangay Sta. Cruz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
