import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
 const storedUser = localStorage.getItem('user')
 // console.log(storedUser)
  if (!storedUser) {
    navigate('/');
    return null;
  }
  const user = JSON.parse(storedUser);
  const { Role: role, Name: name } = user;

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <h3>Welcome, {name}! <br />Your are a: {role}</h3>
      <div className="dashboard-options">
        {role === 'Owner' && (
          <button onClick={() => navigate('/onboard-admin')}>Onboard Admin</button>
        )}
        {role === 'LibraryAdmin' && (
          <>
            <button onClick={() => navigate('/add-book')}>Add Book</button>
            <button onClick={() => navigate('/remove-book')}>Remove Book</button>
            <button onClick={() => navigate('/update-book')}>Update Book</button>
            <button onClick={() => navigate('/issue-requests')}>List Issue Requests</button>
          </>
        )}
        {role === 'Reader' && (
          <>
            <button onClick={() => navigate('/search-book')}>Search Book</button>
            <button onClick={() => navigate('/raise-request')}>Raise Issue Request</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;