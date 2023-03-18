import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './react/pages/Home';
import Wallet from './react/pages/Wallet';

export default function ReactRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/wallet/:wallet" element={<Wallet />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
