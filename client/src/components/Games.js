import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AddGameForm from './AddGameForm';
import { fetchGames } from '../api/games';
import { GamesTable } from './gamesTable';

export default function Games() {
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
    <Box>
      <h1>Video Games</h1>
      <AddGameForm games={games} />
      <GamesTable games={games} />
    </Box>
  );
}
