import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import MatchDetails from './components/MatchDetails';
import TeamDetails from './components/TeamDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/match/:matchId" element={<MatchDetails />} />
        <Route path="/team/:teamId" element={<TeamDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
