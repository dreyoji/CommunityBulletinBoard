import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../assets/user-icon.svg';
import logo from '../assets/logo.png';
import AuthModal from './Authentication/AuthModal';

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <>
      <nav className="sticky top-0 bg-white text-black p-4 flex justify-between items-center shadow-md z-50">
        <div className="flex items-center space-x-8">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <div className="text-lg font-bold">Barangay Sta. Cruz</div>
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <Link to="/history" className="hover:text-gray-700">History</Link>
          <Link to="/local-events" className="hover:text-gray-700">Local Events</Link>
          <Link to="/directory" className="hover:text-gray-700">Directory</Link>
        </div>
        <div className="flex space-x-4 items-center">
          <input 
            type="text" 
            placeholder="Search" 
            className="p-1 rounded border border-gray-300"
          />
          <button className="hover:text-gray-700" onClick={openAuthModal}>
            <UserIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onRequestClose={closeAuthModal} />
    </>
  );
};

export default Navbar;