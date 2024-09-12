// components/Admin.js
import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    role: 'user'  // Default role is 'user'
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send the new user to the backend
    console.log('New user added:', user);
    alert(`User ${user.username} added successfully!`);
    setUser({ username: '', password: '', role: 'user' });
  };

  return (
    <div className="admin-container">
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={user.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default Admin;
