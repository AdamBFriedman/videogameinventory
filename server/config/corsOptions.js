const whitelist = [
  'https://videogameinventory.netlify.app',
  'https://videogameinventory.herokuapp.com/',
  'https://videogameinventory.herokuapp.com/auth',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if domain is in our whitelist
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log('yep');
      callback(null, true);
    } else {
      console.log('nope');
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
