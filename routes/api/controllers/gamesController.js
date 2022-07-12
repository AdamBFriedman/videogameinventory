const data = {
    games: require("../../../model/games.json"),
    setGames: function (data) {
      this.games = data;
    },
  };
  
  const getAllGames = (req, res) => {
    res.json(data.games);
  };
  
  const addGame = (req, res) => {
    const newGame = {
      id: data.games?.length
        ? data.games[data.games.length - 1].id + 1
        : 1,
      name: req.body.name,
      platform: req.body.platform,
    };
  
    if (!newGame.name || !newGame.platform) {
      return res.status(400).json({ message: "Name and platform are required." });
    }
    console.log(newGame);
    data.setGames([...data.games, newGame]);
    res.status(201).json(data.games);
  };
  
  const updateGame = (req, res) => {
    const game = data.games.find(
      (game) => game.id === parseInt(req.body.id)
    );
    if (!game) {
      return res
        .status(400)
        .json({ message: `Game ID ${req.body.id} not found` });
    }
    if (req.body.name) game.name = req.body.name;
    if (req.body.platform) game.platform = req.body.platform;
    const filteredArray = data.games.filter(
      (game) => game.id !== parseInt(req.body.id)
    );
    const unsortedArray = [...filteredArray, game];
    data.setGames(
      unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    );
    res.json(data.games);
  };
  
  const deleteGame = (req, res) => {
    const game = data.games.find(
      (emp) => emp.id === parseInt(req.body.id)
    );
    if (!game) {
      return res
        .status(400)
        .json({ message: `Game ID ${req.body.id} not found` });
    }
    const filteredArray = data.games.filter(
      (emp) => emp.id !== parseInt(req.body.id)
    );
    data.setGames([...filteredArray]);
    res.json(data.games);
  };
  
  const getGame = (req, res) => {
    const game = data.games.find(
      (emp) => emp.id === parseInt(req.params.id)
    );
    if (!game) {
      return res
        .status(400)
        .json({ message: `Game ID ${req.params.id} not found` });
    }
    res.json(game);
  };
  
  module.exports = {
    getAllGames,
    getGame,
    addGame,
    updateGame,
    deleteGame,
  };