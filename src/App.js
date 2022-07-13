import React, { useState, useEffect } from "react";
import "./App.css";

const url = "http://localhost:8000/games";
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      setGames(data);
    });
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
