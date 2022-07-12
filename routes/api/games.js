const express = require('express');
const { getAllGames, addGame, updateGame, deleteGame, getGame } = require('./controllers/gamesController');
const router = express.Router();

router.route('/')
.get(getAllGames)
.post(addGame)
.put(updateGame)
.delete(deleteGame)

router.route('/:id').get(getGame)

module.exports = router;