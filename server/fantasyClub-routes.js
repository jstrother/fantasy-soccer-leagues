const express = require('express'),
  passport = require("passport"),
  { updateData, updateArrayData } = require("./programFunctions/updateData_function.js"),
	fantasyClubRouter = express.Router(),
	FantasyClub = require('../models/fantasyClub_model.js');

fantasyClubRouter.get('/', 
  (req, res) => {
    FantasyClub.findOne({name: req.params.name})
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyClubRouter.get('/',
  passport.authenticate('bearer', {session: false}),
  (req, res) => res.json({
    manager: req.body.manager,
    clubName: req.body.clubName,
    roster: req.body.roster,
    league: req.body.league,
    division: req.body.division,
    champsLeague: req.body.champsLeague,
    schedule: req.body.schedule
  })
);

fantasyClubRouter.put('/addRoster',
  (req, res) => {
    console.log('req.body:', req.body);
    updateArrayData(req.params.player, 'roster', req.body.player, FantasyClub)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyClubRouter.put('/addClubName',
  (req, res) => updateData(req.params.clubName,
    {
      clubName: req.body.clubName
    }, FantasyClub)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    })
);

fantasyClubRouter.put('/addManager',
  (req, res) => updateData(req.params.manager,
    {
      manager: req.body.manager
    }, FantasyClub)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    })
);

exports.fantasyClubRouter = fantasyClubRouter;