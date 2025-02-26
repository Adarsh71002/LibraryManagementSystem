import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import CreateLibrary from './components/CreateLibrary';
import CreateReader from './components/CreateReader';
import Dashboard from './components/Dashboard';
import OnboardAdmin from './components/OnboardAdmin';
import AddBook from './components/AddBook';
import RemoveBook from './components/RemoveBook';
import UpdateBook from './components/UpdateBook';
import IssueRequests from './components/IssueRequests';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/create-library" element={<CreateLibrary />} />
      <Route path="/create-reader" element={<CreateReader />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/onboard-admin" element={<OnboardAdmin />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/remove-book" element={<RemoveBook />} />
      <Route path="/update-book" element={<UpdateBook />} />
      <Route path="/issue-requests" element={<IssueRequests />} />
    </Routes>
  );
}

export default App;