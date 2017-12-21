const express = require('express'),
	playerRouter = express.Router(),
	Player = require('../models/player_model.js');

// this route is to retrieve player stats from the database
playerRouter.get('/:idFromAPI', 
  (req, res) => {
    Player.findOne({idFromAPI: req.params.idFromAPI})
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.playerRouter = playerRouter;