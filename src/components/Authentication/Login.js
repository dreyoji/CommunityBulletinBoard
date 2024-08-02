import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = ({ switchToRegister, onSuccess }) => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        email: credentials.email,
        password: credentials.password,
      });
  
      const { data } = response;
      const { token, role } = data;
      login(token, role);
      onSuccess();
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to login');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      <p className="mt-4 text-sm">
        Don't have an account?{' '}
        <button onClick={switchToRegister} className="text-blue-500 underline">
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;