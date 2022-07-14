const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Game", gameSchema);
