const express = require('express'),
	playerRouter = express.Router(),
	readData = require('./programFunctions/crud_functions.js').readData,
	Player = require('../models/player_model.js');

// this route is to retrieve player stats from the database
playerRouter.get('/:idFromAPI', 
  (req, res) => {
    readData({idFromAPI: req.params.idFromAPI}, Player)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.playerRouter = playerRouter;