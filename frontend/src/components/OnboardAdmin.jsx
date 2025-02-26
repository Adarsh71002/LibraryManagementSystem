import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardAdminAPI } from '../api/api';

const OnboardAdmin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleOnboardAdmin = async (e) => {
    e.preventDefault();
    try {
      await onboardAdminAPI({ name, email, contactNumber });
      setMessage('Admin onboarded successfully');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Onboard Admin failed');
    }
  };

  return (
    <div className="container">
      <h2>Onboard Library Admin</h2>
      <form onSubmit={handleOnboardAdmin}>
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
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Onboard Admin</button>
      </form>
    </div>
  );
};

export default OnboardAdmin;