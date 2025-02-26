import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIssueRequestsAPI, approveIssueRequestAPI, rejectIssueRequestAPI } from '../api/api';

const IssueRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const data = await getIssueRequestsAPI();
      setRequests(data.requests || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch requests');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (reqid) => {
    try {
      await approveIssueRequestAPI(reqid);
      fetchRequests();
    } catch (err) {
      setError(err.message || 'Approve failed');
    }
  };

  const handleReject = async (reqid) => {
    try {
      await rejectIssueRequestAPI(reqid);
      fetchRequests();
    } catch (err) {
      setError(err.message || 'Reject failed');
    }
  };

  return (
    <div className="container">
      <h2>Issue Requests</h2>
      {error && <p className="error">{error}</p>}
      {requests.length === 0 ? (
        <p>No issue requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Book ISBN</th>
              <th>Reader ID</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.ID || req.id}>
                <td>{req.ID || req.id}</td>
                <td>{req.BookID || req.book_id}</td>
                <td>{req.ReaderID || req.reader_id}</td>
                <td>{new Date(req.RequestDate || req.request_date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleApprove(req.ID || req.id)}>Approve</button>
                  <button onClick={() => handleReject(req.ID || req.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default IssueRequests;