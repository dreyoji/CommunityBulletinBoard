import React, { useState, useEffect } from 'react';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
  // Add more users as needed
];

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'name'); // Default sorting by name
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc'); // Default sorting order

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
    localStorage.setItem('sortOrder', sortOrder);
  }, [sortBy, sortOrder]);

  const handleSort = (key) => {
    if (key === sortBy) {
      // Toggle sort order if the same column is clicked
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to ascending order when sorting by a new column
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const handlePromoteAdmin = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, role: 'admin' } : user
    );
    setUsers(updatedUsers);
  };

  const handleRevokeAdmin = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, role: 'user' } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === 'role') {
      // Sort by role (admin first)
      const roleA = a[sortBy] === 'admin' ? 1 : 0;
      const roleB = b[sortBy] === 'admin' ? 1 : 0;
      return sortOrder === 'asc' ? roleA - roleB : roleB - roleA;
    } else {
      // Default sort by string (name, email)
      return sortOrder === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
    }
  });

  const renderSortIndicator = (key) => {
    if (sortBy === key) {
      return sortOrder === 'asc' ? '▲' : '▼';
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
            {sortedUsers.map(user => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role === 'user' && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handlePromoteAdmin(user.id)}>Make Admin</button>
                  )}
                  {user.role === 'admin' && (
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleRevokeAdmin(user.id)}>Revoke Admin</button>
                  )}
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => handleDeleteUser(user.id)}>Delete</button>
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