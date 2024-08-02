import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token');
  const initialRole = localStorage.getItem('role') || 'user'; // Default role is user

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
    setRole('user'); // Reset role to user on logout
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
      const response = await fetch('/api/register', {
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
      throw error; // Propagate the error to handle in the component
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