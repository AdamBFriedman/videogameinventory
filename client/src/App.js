import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import {
  createTheme,
  Theme,
  ThemeProvider,
} from '@mui/material/styles';
import './App.css';
import Home from './components/Home';
import Games from './components/Games';
import { Logout } from './components/Logout';
import { CssBaseline } from '@mui/material';

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <>
          <Logout />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/games" element={<Games />} />
          </Routes>
        </>
      </Router>
    </ThemeProvider>
  );
}

export default App;
