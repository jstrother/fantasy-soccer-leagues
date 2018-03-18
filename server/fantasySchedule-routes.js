const express = require("express"),
  fantasyScheduleRouter = express.Router(),
  FantasyClub = require("../models/fantasyClub_model.js"),
  FantasySchedule = require("../models/fantasySchedule_model.js"),
  FantasyMatch = require("../models/fantasyMatch_model.js"),
  { scheduleCreator } = require("./programFunctions/scheduleCreation_function.js");
  
fantasyScheduleRouter.get('/',
  (req, res) => {
    FantasySchedule
    .find()
    .then(data => {
      // console.log('fantasySchedule-routes.js matches:', data.matches);
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyScheduleRouter.post('/scheduleCreator',
  (req, res) => {
    FantasyClub
    .find()
    .then(data => {
      scheduleCreator(data)
      .then(schedule => {
        FantasySchedule
        .findById(schedule._id)
        .populate({
          path: 'weeklyMatches',
          model: 'WeeklyMatches',
          populate: {
            path: 'matches',
            model: 'FantasyMatch',
            populate: {
              path: 'homeClub awayClub',
              model: 'FantasyClub'
            }
          }
        })
        .exec((error, populatedSchedule) => {
          if (error) {
            return () => {throw new Error(error)};
          }
          res.json(populatedSchedule);
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

exports.fantasyScheduleRouter = fantasyScheduleRouter;