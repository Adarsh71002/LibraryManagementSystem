import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInAPI } from '../api/api';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await signInAPI(email);
     // console.log(user)
     localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Sign in failed');
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;