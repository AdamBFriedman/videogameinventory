import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { addGame, updateGame } from '../api/games';

export default function AddGameForm({
  isEdit,
  games,
  open,
  setOpen,
  setIsEdit,
  originalTitle,
  originalPlatform,
  id,
}) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');

  // Set form if in edit mode
  useEffect(() => {
    if (isEdit) {
      setTitle(originalTitle);
      setPlatform(originalPlatform);
    } else {
      setTitle('');
      setPlatform('');
    }
  }, [isEdit]);

  const handleClose = () => {
    setIsEdit(false);
    setOpen(false);
  };

  const handleAddGame = async () => {
    const duplicate = games.find((game) => game.title === title);
    if (duplicate) {
      alert(
        'Error: There is already a game with this title in your database.'
      );
      return;
    }
    try {
      const createGame = await addGame(title, platform);
      if (createGame) {
        alert('Game successfully added.');
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditGame = async () => {
    try {
      const editGame = await updateGame(title, platform, id);
      if (editGame) {
        alert('Game successfully edited.');
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      {`${typeof id}`}
      {`ID: ${id}`} <br />
      {`Title: ${title}`} <br />
      {`Platform: ${platform}`} <br />
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit Game' : 'Add Game'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
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
          <Button onClick={isEdit ? handleEditGame : handleAddGame}>
            {isEdit ? 'Edit Game' : 'Add Game'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
