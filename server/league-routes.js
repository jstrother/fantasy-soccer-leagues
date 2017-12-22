const express = require('express'),
	leagueRouter = express.Router(),
	Player = require('../models/player_model.js');
	
// this route is to retrieve a list of players from database based upon league id
leagueRouter.get('/:leagueId',
  (req, res) => {
    Player.find({leagueId: req.params.leagueId}, 'fullName position clubName fantasyPoints.season')
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.leagueRouter = leagueRouter;