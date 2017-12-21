const express = require('express'),
	leagueRouter = express.Router(),
	readData = require('./programFunctions/crud_functions.js').readData,
	Player = require('../models/player_model.js');
	
// this route is to retrieve a list of players from database based upon league id
leagueRouter.get('/:leagueId',
  (req, res) => {
    readData({leagueId: req.params.leagueId}, Player)
    .then(data => {
      // console.log('data:', data);
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.leagueRouter = leagueRouter;