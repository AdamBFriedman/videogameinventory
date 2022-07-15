import React, { useState, useEffect } from "react";
import { fetchGames } from "./api/games";
import "./App.css";
import { GamesTable } from "./components/gamesTable";
import Box from "@mui/material/Box"

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const fetchedGames = await fetchGames()
        setGames(fetchedGames)
      } catch (error) {
        console.log(error)
      }
    }
    getGames()
  }, [])
  
  return (
    <Box>
      <h1>Video Games</h1>
      <GamesTable games={games} />
    </Box>
  );
}

export default App;