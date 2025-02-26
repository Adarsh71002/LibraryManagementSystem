import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReaderAPI } from '../api/api';

const CreateReader = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [libId, setLibId] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateReader = async (e) => {
    e.preventDefault();
    try {
      await createReaderAPI({ 
        name, 
        email, 
        contactNumber, 
        lib_id: Number(libId)
      });
      setMessage('Reader created successfully');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Reader creation failed');
    }
  };

  return (
    <div className="container">
      <h2>Create Reader</h2>
      <form onSubmit={handleCreateReader}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Library ID:</label>
          <input type="number" value={libId} onChange={(e) => setLibId(e.target.value)} required />
        </div>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Create Reader</button>
      </form>
    </div>
  );
};

export default CreateReader;