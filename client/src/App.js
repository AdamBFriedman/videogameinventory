import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { fetchGames } from './api/games';
import './App.css';
import { GamesTable } from './components/gamesTable';
import Box from '@mui/material/Box';
import AddGameForm from './components/AddGameForm';
import Login from './components/Login';

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const fetchedGames = await fetchGames();
        setGames(fetchedGames);
      } catch (error) {
        console.log(error);
      }
    };
    getGames();
  }, []);

  return (
    <Router>
      <>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Box>
                <h1>Video Games</h1>
                <AddGameForm games={games} />
                <Login />
                <GamesTable games={games} />
              </Box>
            }
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
