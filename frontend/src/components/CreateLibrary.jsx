import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLibraryAPI } from '../api/api';

const CreateLibrary = () => {
  const [libraryName, setLibraryName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateLibrary = async (e) => {
    e.preventDefault();
    try {
      await createLibraryAPI({ libraryName, ownerName, ownerEmail, ownerContact });
      setMessage('Library created successfully');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Library creation failed');
    }
  };

  return (
    <div className="container">
      <h2>Create Library</h2>
      <form onSubmit={handleCreateLibrary}>
        <div className="form-group">
          <label>Library Name:</label>
          <input
            type="text"
            value={libraryName}
            onChange={(e) => setLibraryName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Owner Name:</label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Owner Email:</label>
          <input
            type="email"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Owner Contact:</label>
          <input
            type="text"
            value={ownerContact}
            onChange={(e) => setOwnerContact(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Create Library</button>
      </form>
    </div>
  );
};

export default CreateLibrary;