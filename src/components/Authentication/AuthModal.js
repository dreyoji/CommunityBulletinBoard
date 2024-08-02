import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthModal = ({ isOpen, onRequestClose }) => {
  const [showLogin, setShowLogin] = useState(true);

  const switchToRegister = () => setShowLogin(false);
  const switchToLogin = () => setShowLogin(true);

  const handleClose = () => {
    setShowLogin(true); 
    onRequestClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md max-w-md w-full">
            <div className="flex justify-end">
              <button className="text-gray-500" onClick={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {showLogin ? <Login switchToRegister={switchToRegister} onSuccess={handleClose} /> : <Register switchToLogin={switchToLogin} onSuccess={handleClose} />}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;