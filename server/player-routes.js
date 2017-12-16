const express = require('express'),
	playerRouter = express.Router(),
	readData = require('./programFunctions/crud_functions.js').readData,
	Player = require('../models/player_model.js');
	
playerRouter.get('/:playerId', 
  (req, res) => {
    readData({idFromAPI: req.params.playerId}, Player)
    .then(data => {
      // console.log('data:', data);
      // res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.playerRouter = playerRouter;