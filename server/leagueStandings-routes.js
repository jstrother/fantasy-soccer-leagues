const mongoose = require("mongoose"),
  leagueStandingsRouter = require("express").Router(),
  FantasyClub = require("../models/fantasyClub_model.js"),
  FantasyMatch = require("../models/fantasyMatch_model.js"),
  {standings} = require("./programFunctions/standings_function.js");

leagueStandingsRouter.get('/',
  (req, res) => {
    FantasyClub
    .find()
    .populate({
      path: 'manager',
      model: 'User'
    })
    .then(populatedClubArray => {
      FantasyMatch
      .find()
      .populate({
        path: 'homeClub awayClub',
        model: 'FantasyClub'
      })
      .then(populatedMatchArray => {
        const currentStandings = standings(populatedClubArray, populatedMatchArray);
        console.log('leagueStandingsRouter:', currentStandings[0].clubName);
        res.json(currentStandings);
      })
      .catch(error => {
        throw new Error(error);
      });
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.leagueStandingsRouter = leagueStandingsRouter;