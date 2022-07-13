import React, { useState, useEffect } from "react";
import { fetchGames } from "./api/games";
import "./App.css";

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
    <div className="App">
      <h1>Video Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
