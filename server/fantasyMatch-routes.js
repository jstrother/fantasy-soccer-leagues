const fantasyMatchRouter = require("express").Router(),
  WeeklyMatches = require("../models/weeklyMatches_model.js"),
  { matchResolver } = require("./programFunctions/scheduleCreation_function.js");
  
fantasyMatchRouter.post('/',
  (req, res) => {
    WeeklyMatches
    .find()
    .populate({
      path: 'matches',
      model: 'FantasyMatch',
      populate: {
        path: 'homeClub awayClub',
        model: 'FantasyClub'
      }
    })
    .exec((error, allWeeklyMatches) => {
      if (error) {
        return () => {throw new Error(error)};
      }
      res.json(matchResolver(allWeeklyMatches));
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.fantasyMatchRouter = fantasyMatchRouter;