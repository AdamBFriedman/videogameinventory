const express = require('express');
const { getAllGames, addGame, updateGame, deleteGame, getGame } = require('../../controllers/gamesController');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT')

router.route('/')
.get(getAllGames)
.post(verifyJWT, addGame)
.put(verifyJWT, updateGame)
.delete(verifyJWT, deleteGame)

router.route('/:id').get(getGame)

module.exports = router;