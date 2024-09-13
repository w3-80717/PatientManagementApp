import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');

      // Decode token to check role (you may want to use a library for JWT decoding)
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(decodedToken.role === 'admin');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', decodedToken.role === 'admin');
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
