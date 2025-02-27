import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBookAPI } from '../api/api';

const AddBook = () => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publisher, setPublisher] = useState('');
  const [version, setVersion] = useState('');
  const [copies, setCopies] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await addBookAPI({
        /*isbn,
        title,
        authors,
        publisher,
        version,
        copies: Number(copies),*/
        ISBN: isbn,
        Title: title,
        Authors: authors,
        Publisher: publisher,
        Version: version,
        Copies: Number(copies)
      });
      setMessage('Book added successfully');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Add book failed');
    }
  };

  return (
    <div className="container">
      <h2>Add Book</h2>
      <form onSubmit={handleAddBook}>
        <div className="form-group">
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Authors:</label>
          <input type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Publisher:</label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Version:</label>
          <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Copies:</label>
          <input type="number" value={copies} onChange={(e) => setCopies(e.target.value)} required min="1" />
        </div>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;