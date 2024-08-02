import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ManageUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'name'); // Default sorting by name
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc'); // Default sorting order

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const sortedUsers = response.data.sort((a, b) => {
          if (sortBy === 'role') {
            const roleA = a[sortBy] === 'admin' ? 1 : 0;
            const roleB = b[sortBy] === 'admin' ? 1 : 0;
            return sortOrder === 'asc' ? roleA - roleB : roleB - roleA;
          } else {
            return sortOrder === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
          }
        });
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token, sortBy, sortOrder]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
    localStorage.setItem('sortOrder', sortOrder);
  }, [sortBy, sortOrder]);

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const updatedUsers = users.filter(user => user._id !== id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handlePromoteAdmin = async (id) => {
    try {
      const response = await axios.put(`/api/users/${id}/role`, { role: 'admin' }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const updatedUsers = users.map(user =>
          user._id === id ? { ...user, role: 'admin' } : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error promoting user to admin:', error);
    }
  };

  const handleRevokeAdmin = async (id) => {
    try {
      const response = await axios.put(`/api/users/${id}/role`, { role: 'user' }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const updatedUsers = users.map(user =>
          user._id === id ? { ...user, role: 'user' } : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error revoking user admin role:', error);
    }
  };

  const handleSort = (key) => {
    if (key === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const renderSortIndicator = (key) => {
    if (sortBy === key) {
      return sortOrder === 'asc' ? ' ▲' : ' ▼';
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="table-fixed w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 w-1/4 cursor-pointer" onClick={() => handleSort('name')}>
                Name {renderSortIndicator('name')}
              </th>
              <th className="border border-gray-300 px-4 py-2 w-1/4 cursor-pointer" onClick={() => handleSort('email')}>
                Email {renderSortIndicator('email')}
              </th>
              <th className="border border-gray-300 px-4 py-2 w-1/4 cursor-pointer" onClick={() => handleSort('role')}>
                Role {renderSortIndicator('role')}
              </th>
              <th className="border border-gray-300 px-4 py-2 w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'user' && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handlePromoteAdmin(user._id)}>Make Admin</button>
                  )}
                  {user.role === 'admin' && (
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleRevokeAdmin(user._id)}>Revoke Admin</button>
                  )}
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;