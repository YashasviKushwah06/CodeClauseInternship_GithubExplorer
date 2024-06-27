import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RepositoryDetails from './pages/RepositoryDetails';
import UserProfile from './pages/UserProfile';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repository/:owner/:repo" element={<RepositoryDetails />} />
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
