const whitelist = [
  'https://www.yoursite.com',
  // TODO: Remove the below links in production
  // When you click the "Go Live" button in VS Code
  'http://127.0.0.1:5500',
  // Local environment
  'http://localhost:3000',
  'http://localhost:8000',
  'https://videogameinventory.herokuapp.com/',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if domain is in our whitelist
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
