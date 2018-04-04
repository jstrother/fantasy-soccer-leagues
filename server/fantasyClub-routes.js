const { updateData } = require("./programFunctions/updateData_function.js"),
  mongoose = require("mongoose"),
	fantasyClubRouter = require("express").Router(),
	FantasyClub = require('../models/fantasyClub_model.js'),
	User = require("../models/user_model.js");

fantasyClubRouter.get('/', 
  (req, res) => {
    FantasyClub
    .findOne({manager: req.params.userId})
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyClubRouter.put('/addClubName',
  (req, res) => {
    // console.log('fcRoutes req:', req);
    FantasyClub
    .findOneAndUpdate(
      {
        manager: req.params.userId
      },
      {
        clubName: req.body.clubName
      },
      {
        new: true, 
        upsert: true
      }
    )
    .then(data => {
      console.log('fcRoutes addClubName:', data);
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyClubRouter.put('/newClub',
  (req, res) => {
    console.log('req.body:', req.body);
    const newClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      manager: req.body.userId
    });
    
    newClub
    .save()
    .catch(error => {
      throw new Error(error);
    });
    
    FantasyClub
    .findOne({_id: newClub._id})
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

exports.fantasyClubRouter = fantasyClubRouter;