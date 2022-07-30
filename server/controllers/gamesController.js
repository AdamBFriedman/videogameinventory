const Game = require('../model/Game');

const getAllGames = async (req, res) => {
  const games = await Game.find();
  if (!games)
    return res.status(204).json({ message: 'No games found.' });
  res.json(games);
};

const addGame = async (req, res) => {
  if (!req?.body?.title || !req?.body?.platform) {
    return res
      .status(400)
      .json({ message: 'Title and Platform are required!' });
  }

  try {
    const result = await Game.create({
      title: req.body.title,
      platform: req.body.platform,
      cib: req.body.cib,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateGame = async (req, res) => {
  if (!req?.body?.id) {
    return res
      .status(400)
      .json({ message: 'ID parameter is required.' });
  }

  const game = await Game.findOne({ _id: req.body.id }).exec();
  if (!game) {
    return res
      .status(204)
      .json({ message: `No game matches ID ${req.body.id}.` });
  }
  game.title = req.body.title;
  game.platform = req.body.platform;
  game.cib = req.body.cib;
  const result = await game.save();
  res.json(result);
};

const deleteGame = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: 'Game ID required.' });

  const game = await Game.findOne({ _id: req.body.id }).exec();
  if (!game) {
    return res
      .status(204)
      .json({ message: `No game matches ID ${req.body.id}.` });
  }
  const result = await game.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getGame = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Game ID required.' });

  const game = await Game.findOne({ _id: req.params.id }).exec();
  if (!game) {
    return res
      .status(204)
      .json({ message: `No game matches ID ${req.params.id}.` });
  }
  res.json(game);
};

module.exports = {
  getAllGames,
  addGame,
  updateGame,
  deleteGame,
  getGame,
};
