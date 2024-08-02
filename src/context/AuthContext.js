import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token');
  const initialRole = localStorage.getItem('role') || 'user'; 

  const [token, setToken] = useState(initialToken);
  const [role, setRole] = useState(initialRole);

  const login = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
  };

  const logout = () => {
    setToken(null);
    setRole('user'); 
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const isLoggedIn = () => {
    return token !== null && token !== undefined;
  };

  const isAdmin = () => {
    return role === 'admin';
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await axios({
        url: '/api/auth/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      const { token, role } = data;
      login(token, role);
    } catch (error) {
      console.error('Registration error:', error);
      throw error; 
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        login,
        logout,
        isLoggedIn,
        isAdmin,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;