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
      const matchArray = FantasyMatch.find();
      console.log('matchArray:', matchArray);
      // console.log('standings:', standings(populatedClubArray));
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.leagueStandingsRouter = leagueStandingsRouter;