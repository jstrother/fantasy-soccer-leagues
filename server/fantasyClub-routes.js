const passport = require("passport"),
  { updateData } = require("./programFunctions/updateData_function.js"),
	fantasyClubRouter = require("express").Router(),
	FantasyClub = require('../models/fantasyClub_model.js');

fantasyClubRouter.get('/:userId', 
  (req, res) => {
    FantasyClub
    .findOne({userId: req.params.userId})
    .then(data => {
      console.log('fcRoutes 1st get:', data);
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyClubRouter.get('/:userId',
  passport.authenticate('bearer', {session: false}),
  (req, res) => res.json({
    userId: req.body.userId,
    manager: req.body.manager,
    clubName: req.body.clubName,
    points: req.body.points,
    wins: req.body.wins,
    draws: req.body.draws,
    losses: req.body.losses,
    goalsFor: req.body.goalsFor,
    goalsAgainst: req.body.goalsAgainst,
    goalDifferential: req.body.goalDifferential
  })
);

fantasyClubRouter.put('/addClubName',
  (req, res) => {
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
      manager: req.body.manager,
      userId: req.body.userId
    }, FantasyClub)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    })
);

exports.fantasyClubRouter = fantasyClubRouter;