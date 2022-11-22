import React, { useState, useEffect } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import AddGameForm from './AddGameForm';
import { fetchGames } from '../api/games';
import { GamesTable } from './GamesTable';
import { Logout } from './Logout';

export default function Games() {
  const [games, setGames] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [id, setId] = useState('');
  const [shouldAlert, setShouldAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] =
    useState<AlertColor>('error');
  const [alertMessage, setAlertMessage] = useState(
    'Error: Something went wrong.'
  );

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

  const handleClose = () => {
    setShouldAlert(false);
  };

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
          setShouldAlert={setShouldAlert}
          setAlertSeverity={setAlertSeverity}
          setAlertMessage={setAlertMessage}
        />
        <GamesTable
          games={games}
          setOpen={setOpen}
          setIsEdit={setIsEdit}
          setTitle={setTitle}
          setPlatform={setPlatform}
          setId={setId}
          setTriggerRefresh={setTriggerRefresh}
          setShouldAlert={setShouldAlert}
          setAlertSeverity={setAlertSeverity}
          setAlertMessage={setAlertMessage}
        />
      </Box>
      {shouldAlert ? (
        <Snackbar
          open={shouldAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
      ) : null}
    </Box>
  );
}
