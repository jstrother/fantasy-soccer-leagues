const express = require("express"),
  fantasyMatchRouter = express.Router(),
  WeeklyMatches = require("../models/weeklyMatches_model.js"),
  { matchResolver } = require("./programFunctions/scheduleCreation_function.js");

fantasyMatchRouter.post('/matchResolution',
  (req, res) => {
    WeeklyMatches
    .find()
    .then(data => {
      matchResolver(data)
      .then(weeklyMatches => {
        WeeklyMatches
        .findById(weeklyMatches._id)
        .populate({
          path: 'matches',
          model: 'FantasyMatch',
          populate: {
            path: 'homeClub awayClub',
            model: 'FantasyClub'
          }
        })
        .exec((error, resolvedMatches) => {
          if (error) {
            return () => {throw new Error(error)};
          }
          res.json(resolvedMatches);
        });
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

exports.fantasyMatchRouter = fantasyMatchRouter;