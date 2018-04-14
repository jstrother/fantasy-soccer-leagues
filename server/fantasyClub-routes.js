const mongoose = require("mongoose"),
	fantasyClubRouter = require("express").Router(),
	FantasyClub = require('../models/fantasyClub_model.js'),
	User = require("../models/user_model.js");

fantasyClubRouter.get('/', 
  (req, res) => {
    FantasyClub
    .findOne({manager: req.params.userId})
    .populate({
      path: 'manager',
      model: 'User'
    })
    .exec((error, populatedClub) => {
      if (error) {
        throw new Error(error);
      }
      res.json(populatedClub);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyClubRouter.put('/newClub',
  (req, res) => {
  const newClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      manager: req.body.manager,
      clubName: req.body.clubName
    });
    
    newClub
    .save()
    .then(function(newClub) {
      res.json(newClub);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.fantasyClubRouter = fantasyClubRouter;