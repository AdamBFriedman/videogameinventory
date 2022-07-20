import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Games from './components/Games';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/games" element={<Games />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
