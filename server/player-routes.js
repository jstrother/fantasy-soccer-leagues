const express = require('express'),
	playerRouter = express.Router(),
	readData = require('./programFunctions/crud_functions.js').readData,
	Player = require('../models/player_model.js');
	
playerRouter.get('/starter', (req, res) => {
  return readData(req.idFromAPI, Player)
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    console.log(`starter readData error: ${error}`);
  });
});

playerRouter.get('/bencher', (req, res) => {
  return readData(req.idFromAPI, Player)
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    console.log(`bencher readData error: ${error}`);
  });
});

playerRouter.get('/reserve', (req, res) => {
  return readData(req.idFromAPI, Player)
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    console.log(`reserve readData error: ${error}`);
  });
});

exports.playerRouter = playerRouter;