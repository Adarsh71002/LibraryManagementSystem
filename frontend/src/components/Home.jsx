import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToSignIn = () => navigate('/signin');
  const goToCreateLibrary = () => navigate('/create-library');
  const goToCreateReader = () => navigate('/create-reader');

  return (
    <div className="container">
      <h1>Library Management System</h1>
      <div className="button-group">
        <button onClick={goToSignIn}>Sign In</button>
        <button onClick={goToCreateLibrary}>Create Library</button>
        <button onClick={goToCreateReader}>Create Reader</button>
      </div>
    </div>
  );
};

export default Home;