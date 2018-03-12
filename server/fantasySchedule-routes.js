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
      res.json(data.matches);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyScheduleRouter.get('/populateSchedule',
  (req, res) => {
    FantasySchedule
    .find()
    .populate('matches')
    .then(data => {
      res.json(data.matches);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyScheduleRouter.get('/populateMatches',
  (req, res) => {
    FantasyMatch
    .find()
    .populate('homeClub')
    .populate('awayClub')
    .then(data => {
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
          console.log('populatedWeeklyMatches:', populatedSchedule.weeklyMatches);
          // res.json(populatedSchedule);
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