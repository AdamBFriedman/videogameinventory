import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { getHeadersWithAuth } from "./Login";
import { handleErrors } from "./Login";

export const addGame = async (title, platform) => {
  return await fetch("http://localhost:8000/games", {
    method: "POST",
    headers: getHeadersWithAuth(),
    body: JSON.stringify({
      name: title,
      platform,
    }),
  }).then(handleErrors);
};

export default function AddGameForm({ games }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddGame = async () => {
    const duplicate = games.find((game) => game.name === title);
    if (duplicate) {
      alert("Error: There is already a game with this title in your database.");
      return;
    }
    try {
      const createGame = await addGame(title, platform);
      if (createGame) alert("Game successfully added.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Game
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add New Game</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="platform"
            label="Platform"
            type="text"
            fullWidth
            variant="standard"
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleAddGame()}>Add Game</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
