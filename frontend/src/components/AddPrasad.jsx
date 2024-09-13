import React, { useState } from 'react';
import axios from 'axios';

const AddPrasad = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddPrasad = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/prasads/add', { name, description });
      alert('Prasad added successfully');
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding prasad:', error);
    }
  };

  return (
    <div>
      <h1>Add Prasad</h1>
      <form onSubmit={handleAddPrasad}>
        <input
          type="text"
          placeholder="Prasad Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Prasad Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Prasad</button>
      </form>
    </div>
  );
};

export default AddPrasad;
