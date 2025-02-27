import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchBooksAPI } from '../api/api';

const SearchBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const queryParams = { title, author, publisher };
      const data = await searchBooksAPI(queryParams);
      setResults(data.books || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Search failed');
      setResults([]);
    }
  };

  return (
    <div className="container">
      <h2>Search Books</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Enter title" 
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input 
            type="text" 
            value={author} 
            onChange={e => setAuthor(e.target.value)} 
            placeholder="Enter author" 
          />
        </div>
        <div className="form-group">
          <label>Publisher:</label>
          <input 
            type="text" 
            value={publisher} 
            onChange={e => setPublisher(e.target.value)} 
            placeholder="Enter publisher" 
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {results.length > 0 && (
        <div className="table-container">
          <h3>Results:</h3>
          <table>
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Authors</th>
                <th>Publisher</th>
                <th>Version</th>
                <th>Total Copies</th>
                <th>Available Copies</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((book, index) => (
                <tr key={index}>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>
                  <td>{book.authors}</td>
                  <td>{book.publisher}</td>
                  <td>{book.version}</td>
                  <td>{book.total_copies}</td>
                  <td>{book.available_copies}</td>
                  <td>{book.availability}</td>
                  <td>
                    {book.available_copies > 0 ? (
                      <button onClick={() => navigate(`/raise-request?isbn=${book.isbn}`)}>
                        Issue Request
                      </button>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchBook;
