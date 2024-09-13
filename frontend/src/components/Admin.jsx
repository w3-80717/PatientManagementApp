import React, { useState } from 'react';
import axios from 'axios';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', user);
      alert('User registered successfully!');
      setUser({ username: '', password: '', role: 'user' });
    } catch (error) {
      alert('An error occurred while registering the user');
      console.error(error);
    }
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
