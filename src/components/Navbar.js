// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../assets/user-icon.svg';
import logo from '../assets/logo.png';
import AuthModal from './Authentication/AuthModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router DOM

const Navbar = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout using navigate
  };

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
          {isLoggedIn() && isAdmin() && <Link to="/manage-users" className="hover:text-gray-700">Manage Users</Link>}
        </div>
        <div className="flex space-x-4 items-center">
          {isLoggedIn() ? (
            <button onClick={handleLogout} className="hover:text-gray-700">Logout</button>
          ) : (
            <button className="hover:text-gray-700" onClick={openAuthModal}>
              <UserIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onRequestClose={closeAuthModal} />
    </>
  );
};

export default Navbar;