import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeBookAPI } from '../api/api';

const RemoveBook = () => {
  const [isbn, setIsbn] = useState('');
  const [copiesToRemove, setCopiesToRemove] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRemoveBook = async (e) => {
    e.preventDefault();
    try {
      await removeBookAPI(isbn, { CopiesToRemove: Number(copiesToRemove) });
      setMessage('Book copies removed successfully');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Remove book failed');
    }
  };

  return (
    <div className="container">
      <h2>Remove Book</h2>
      <form onSubmit={handleRemoveBook}>
        <div className="form-group">
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Copies to Remove:</label>
          <input type="number" value={copiesToRemove} onChange={(e) => setCopiesToRemove(e.target.value)} required min="1" />
        </div>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Remove Book</button>
      </form>
    </div>
  );
};

export default RemoveBook;