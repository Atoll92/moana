import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import ThreeDScene from './ThreeDScene';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scene/:projectId" element={<ThreeDScene />} />
      </Routes>
    </Router>
  );
}

export default App;

