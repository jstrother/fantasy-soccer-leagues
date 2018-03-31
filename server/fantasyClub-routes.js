const { updateData } = require("./programFunctions/updateData_function.js"),
	fantasyClubRouter = require("express").Router(),
	FantasyClub = require('../models/fantasyClub_model.js');

fantasyClubRouter.get('/:userId', 
  (req, res) => {
    FantasyClub
    .findOne({userId: req.params.userId})
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyClubRouter.put('/:userId/addClubName',
  (req, res) => {
    console.log('fcRoutes req:', req);
    FantasyClub
    .findOneAndUpdate(
      req.params.userId,
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

fantasyClubRouter.put('/addManager',
  (req, res) => updateData(req.params.manager,
    {
      manager: req.body.manager,
      userId: req.body.userId
    }, FantasyClub)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new Error(error);
    })
);

exports.fantasyClubRouter = fantasyClubRouter;