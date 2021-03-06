import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddGameForm from './AddGameForm';
import { fetchGames } from '../api/games';
import { GamesTable } from './gamesTable';
import { Logout } from '../components/Logout';

export default function Games() {
  const [games, setGames] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [id, setId] = useState('');

  const [triggerRefetch, setTriggerRefresh] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
    setTriggerRefresh(false);
  }, [triggerRefetch]);

  return (
    <Box>
      <Logout />
      <h1>Video Games</h1>

      <Box width={'80vw'} justifyContent={'center'} margin={'auto'}>
        <Button variant="contained" onClick={handleClickOpen}>
          <Typography variant="h6" component="h6">
            Add Game
          </Typography>
        </Button>
        <AddGameForm
          isEdit={isEdit}
          games={games}
          open={open}
          setOpen={setOpen}
          setIsEdit={setIsEdit}
          originalTitle={title}
          originalPlatform={platform}
          id={id}
          setTriggerRefresh={setTriggerRefresh}
        />
        <GamesTable
          games={games}
          setOpen={setOpen}
          setIsEdit={setIsEdit}
          setTitle={setTitle}
          setPlatform={setPlatform}
          setId={setId}
          setTriggerRefresh={setTriggerRefresh}
        />
      </Box>
    </Box>
  );
}
