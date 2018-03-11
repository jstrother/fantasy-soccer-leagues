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

fantasyScheduleRouter.post('/createSchedule',
  (req, res) => {
    // console.log('req:', req);
    FantasyClub
    .find()
    .then(data => {
      res.json(scheduleCreator(data).matches);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.fantasyScheduleRouter = fantasyScheduleRouter;