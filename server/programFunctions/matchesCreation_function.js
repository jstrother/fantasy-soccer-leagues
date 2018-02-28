const express = require("express"),
  matchesRouter = express.Router(),
  FantasyMatch = require("../models/fantasyMatch_model.js");
  
matchesRouter.get('/',
  (req, res) => res.json({
    matchId: req.body.matchId,
    homeClub: req.body.homeClub,
    homeScore: req.body.homeScore,
    awayClub: req.body.awayClub,
    awayScore: req.body.awayScore
  })
);
  
matchesRouter.post('/addMatch/',
  (req, res) => {
    (req, res) => {
      FantasyMatch
      .create()
    };
  }
);