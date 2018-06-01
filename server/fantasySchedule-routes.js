const fantasyScheduleRouter = require("express").Router(),
  FantasyClub = require("../models/fantasyClub_model.js"),
  FantasySchedule = require("../models/fantasySchedule_model.js"),
  WeeklyMatches = require("../models/weeklyMatches_model.js"),
  { scheduleCreator } = require("./programFunctions/scheduleCreation_function.js"),
  {matchResolver} = require("./programFunctions/matchResolver_function.js");

fantasyScheduleRouter.post('/matchResolver',
  (req, res) => {
    FantasyClub
    .find()
    .then(clubArray => {
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
      .then(fullSchedule => {
        res.json(matchResolver(fullSchedule, clubArray));
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

fantasyScheduleRouter.get('/',
  (req, res) => {
    FantasySchedule
    .find()
    .then(schedules => {
      res.json(schedules);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);
  
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
    .then(populatedSchedule => {
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
        .then(populatedSchedule => {
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