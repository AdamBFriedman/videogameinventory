import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

export const getHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: '*/*',
});

export const getHeadersWithAuth = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('JWT')}`,
});

export const handleErrors = (res) => {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res.json();
};

export default function LoginForm() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginAsUser = async () => {
    const JWT = await fetch('http://localhost:8000/auth', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ user: username, pwd: password }),
    }).then(handleErrors);

    localStorage.setItem('JWT', JWT.accessToken);

    setUsername('');
    setPassword('');

    handleClose();

    return JWT;
  };

  const handleLogin = async () => {
    try {
      loginAsUser().then((result) => console.log(result));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
