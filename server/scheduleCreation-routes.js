const express = require("express"),
  scheduleCreationRouter = express.Router(),
  FantasyMatch = require("../models/fantasyMatch_model.js"),
  FantasySchedule = require("../models/fantasySchedule_model.js");

scheduleCreationRouter.post('/fantasyMatch',
  (req, res) => {
    FantasyMatch
    .find()
    .populate('homeClub')
    .populate('awayClub')
    .catch(error => {
      throw new Error(error);
    });
  }
);

scheduleCreationRouter.post('/fantasySchedule',
  (req, res) => {
    FantasySchedule
    .find()
    .populate('matches')
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.scheduleCreationRouter = scheduleCreationRouter;