const fantasyScheduleRouter = require("express").Router(),
  FantasyClub = require("../models/fantasyClub_model.js"),
  FantasySchedule = require("../models/fantasySchedule_model.js"),
  WeeklyMatches = require("../models/weeklyMatches_model.js"),
  { scheduleCreator, matchResolver } = require("./programFunctions/scheduleCreation_function.js");
  
fantasyScheduleRouter.get('/:leagueScheduleId',
  (req, res) => {
    FantasySchedule
    .findById(req.params.leagueScheduleId)
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
    .then(clubArray => {
      scheduleCreator(clubArray)
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

fantasyScheduleRouter.post('/matchResolver',
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

exports.fantasyScheduleRouter = fantasyScheduleRouter;