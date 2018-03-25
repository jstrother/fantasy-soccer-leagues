const fantasyMatchRouter = require("express").Router(),
  WeeklyMatches = require("../models/weeklyMatches_model.js"),
  { matchResolver } = require("./programFunctions/scheduleCreation_function.js");

fantasyMatchRouter.post('/matchResolution',
  (req, res) => {
    WeeklyMatches
    .find()
    .then(allWeeklyMatches => {
      matchResolver(allWeeklyMatches);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.fantasyMatchRouter = fantasyMatchRouter;