const fantasyScheduleRouter = require("express").Router(),
  FantasyClub = require("../models/fantasyClub_model.js"),
  FantasySchedule = require("../models/fantasySchedule_model.js"),
  { scheduleCreator } = require("./programFunctions/scheduleCreation_function.js");
  
fantasyScheduleRouter.get('/',
  (req, res) => {
    FantasySchedule
    .find()
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
        .find()
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