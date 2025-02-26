
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateBookAPI } from '../api/api';

const UpdateBook = () => {
  const [isbn, setIsbn] = useState('');
  const [updateData, setUpdateData] = useState({
    title: '',
    authors: '',
    publisher: '',
    version: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const data = {};
    if (updateData.title.trim()) data.Title = updateData.title;
    if (updateData.authors.trim()) data.Authors = updateData.authors;
    if (updateData.publisher.trim()) data.Publisher = updateData.publisher;
    if (updateData.version.trim()) data.Version = updateData.version;
    
    if (Object.keys(data).length === 0) {
      setError("Please provide at least one field to update");
      return;
    }

    try {
      await updateBookAPI(isbn, data);
      setMessage('Book details updated successfully');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Update book failed');
    }
  };

  return (
    <div className="container">
      <h2>Update Book</h2>
      <form onSubmit={handleUpdateBook}>
        <div className="form-group">
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Title (optional):</label>
          <input type="text" value={updateData.title} onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Authors (optional):</label>
          <input type="text" value={updateData.authors} onChange={(e) => setUpdateData({ ...updateData, authors: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Publisher (optional):</label>
          <input type="text" value={updateData.publisher} onChange={(e) => setUpdateData({ ...updateData, publisher: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Version (optional):</label>
          <input type="text" value={updateData.version} onChange={(e) => setUpdateData({ ...updateData, version: e.target.value })} />
        </div>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
