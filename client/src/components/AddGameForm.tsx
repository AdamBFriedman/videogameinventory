import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { addGame, updateGame } from '../api/games';
import {
  AlertColor,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

export interface Game {
  _id: string;
  title: string;
  platform: string;
  cib: boolean;
}

interface AddGameFormProps {
  isEdit: boolean;
  games: Game[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  originalTitle: string;
  originalPlatform: string;
  id: string;
  setTriggerRefresh: Dispatch<SetStateAction<boolean>>;
  setShouldAlert: Dispatch<SetStateAction<boolean>>;
  setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
}

export default function AddGameForm({
  isEdit,
  games,
  open,
  setOpen,
  setIsEdit,
  originalTitle,
  originalPlatform,
  id,
  setTriggerRefresh,
  setShouldAlert,
  setAlertSeverity,
  setAlertMessage,
}: AddGameFormProps) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [cib, setCib] = React.useState(false);

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
    const duplicate =
      games.find((game) => game.title === title) &&
      games.find((game) => game.platform === platform);
    if (duplicate) {
      setShouldAlert(true);
      setAlertSeverity('error');
      setAlertMessage(
        `Error: ${title} on the ${platform} is already in your database.`
      );
      return;
    }
    try {
      const createGame = await addGame(title, platform, cib);
      if (createGame) {
        setShouldAlert(true);
        setAlertSeverity('success');
        setAlertMessage(`${title} successfully added.`);
        handleClose();
        setTriggerRefresh(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditGame = async () => {
    try {
      const editGame = await updateGame(title, platform, cib, id);
      if (editGame) {
        setShouldAlert(true);
        setAlertSeverity('success');
        setAlertMessage(`${title} successfully edited.`);
        handleClose();
        setTriggerRefresh(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
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
          <FormLabel id="demo-row-radio-buttons-group-label">
            CIB
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={cib === true ? 'yes' : 'no'}
            onChange={(event) => {
              setCib(event.target.value === 'yes' ? true : false);
            }}
          >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
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
