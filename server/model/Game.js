const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  cib: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Game', gameSchema);
