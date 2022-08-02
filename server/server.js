require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./middleware/logEvents');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Custom logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Handle form data
app.use(express.urlencoded({ extended: false }));

// Handle json data
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/games', require('./routes/api/games'));

// Error routes
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'pages', 'error.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404: Not Found' });
  } else {
    res.type('txt').send('404: Not Found');
  }
});
//test
// Custom error handling
app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Successfully connected to MongoDB!');
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});
