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
    starters: req.body.starters,
    benchwarmers: req.body.benchwarmers,
    reserves: req.body.reserves,
    league: req.body.league,
    division: req.body.division,
    champsLeague: req.body.champsLeague,
    schedule: req.body.schedule
  })
);

fantasyClubRouter.post('/addRoster',
  (req, res) => {
    console.log('req.params:', req.params);
    console.log('req.body.player:', req.body.player);
    FantasyClub
    .findOneAndUpdate(
      req.params.roster,
      {$addToSet: {roster: req.body.player}}
    )
    .then(data => {
      console.log('data.roster:', data.roster);
      res.json(data.roster);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyClubRouter.put('/addClubName',
  (req, res) => {
    // console.log('req.params:', req.params);
    updateData(req.params.clubName,
      {
        clubName: req.body.clubName
      }, FantasyClub)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
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