const mongoose = require("mongoose"),
  leagueStandingsRouter = require("express").Router(),
  FantasyClub = require("../models/fantasyClub_model.js"),
  {standingsCalculator} = require("../server/programFunctions/standingsCalculator_function.js");

leagueStandingsRouter.get('/',
  (req, res) => {
    FantasyClub
    .find()
    .populate({
      path: 'manager',
      model: 'User'
    })
    .then(populatedClubArray => {
      console.log('populatedClubArray:', populatedClubArray);
    })
    .catch(error => {
      console.log('leagueStandingsRouter error:', error);
      // throw new Error(error);
    });
  }
);

exports.leagueStandingsRouter = leagueStandingsRouter;