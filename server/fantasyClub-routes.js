const express = require('express'),
  { updateData } = require("./programFunctions/updateData_function.js"),
	fantasyClubRouter = express.Router(),
	FantasyClub = require('../models/fantasyClub_model.js');

fantasyClubRouter.get('/', 
  (req, res) => {
    FantasyClub.findOne({name: req.params.name})
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyClubRouter.put('/addRoster',
  (req, res) => updateData(req.params.roster,
    {
      roster: req.body.roster
    }, FantasyClub)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    })
);

fantasyClubRouter.put('/addClubName',
  (req, res) => updateData(req.params.clubName,
    {
      clubName: req.body.clubName
    }, FantasyClub)
    .then(data => {
      console.log('clubName data routes:', data);
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    })
);

fantasyClubRouter.put('/addManager',
  (req, res) => updateData(req.params.manager,
    {
      manager: req.body.manager
    }, FantasyClub)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    })
);

exports.fantasyClubRouter = fantasyClubRouter;