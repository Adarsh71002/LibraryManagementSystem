import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { raiseIssueRequestAPI } from '../api/api';

const RaiseRequest = () => {
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill ISBN if passed as a query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isbnParam = params.get('isbn');
    if (isbnParam) {
      setIsbn(isbnParam);
    }
  }, [location.search]);

  const handleRaiseRequest = async (e) => {
    e.preventDefault();
    try {
      await raiseIssueRequestAPI({ ISBN: isbn });
      setMessage('Issue request raised successfully');
      setError('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to raise issue request');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Raise Issue Request</h2>
      <form onSubmit={handleRaiseRequest}>
        <div className="form-group">
          <label>Book ISBN:</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Raise Request</button>
      </form>
    </div>
  );
};

export default RaiseRequest;
