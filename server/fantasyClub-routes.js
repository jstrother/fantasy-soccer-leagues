const passport = require("passport"),
  { updateData } = require("./programFunctions/updateData_function.js"),
	fantasyClubRouter = require("express").Router(),
	FantasyClub = require('../models/fantasyClub_model.js');

fantasyClubRouter.get('/', 
  (req, res) => {
    FantasyClub
    .find()
    .then(data => {
      // console.log('fcRoutes data:11', data);
      data.forEach(fClub => {
        
      });
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

fantasyClubRouter.get('/',
  passport.authenticate('bearer', {session: false}),
  (req, res) => res.json({
    userId: req.body.userId,
    manager: req.body.manager,
    clubName: req.body.clubName,
    goalkeepers: req.body.goalkeepers,
    defenders: req.body.defenders,
    midfielders: req.body.midfielders,
    forwards: req.body.forwards,
    starters: req.body.starters,
    benchwarmers: req.body.benchwarmers,
    points: req.body.points,
    wins: req.body.wins,
    draws: req.body.draws,
    losses: req.body.losses,
    goalsFor: req.body.goalsFor,
    goalsAgainst: req.body.goalsAgainst,
    goalDifferential: req.body.goalDifferential
  })
);

fantasyClubRouter.post('/addGoalkeeper',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.goalkeepers,
      {$addToSet: {goalkeepers: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.goalkeepers  
      )
      .then(data => {
        res.json(data.goalkeepers);
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

fantasyClubRouter.post('/removeGoalkeeper',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.goalkeepers,
      {$pull: {goalkeepers: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.goalkeepers
      )
      .then(data => {
        res.json(data.goalkeepers);
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

fantasyClubRouter.post('/addDefender',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.defenders,
      {$addToSet: {defenders: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.defenders  
      )
      .then(data => {
        res.json(data.defenders);
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

fantasyClubRouter.post('/removeDefender',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.defenders,
      {$pull: {defenders: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.defenders
      )
      .then(data => {
        res.json(data.defenders);
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

fantasyClubRouter.post('/addForward',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.forwards,
      {$addToSet: {forwards: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.forwards  
      )
      .then(data => {
        res.json(data.forwards);
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

fantasyClubRouter.post('/removeForward',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.forwards,
      {$pull: {forwards: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.forwards  
      )
      .then(data => {
        res.json(data.forwards);
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

fantasyClubRouter.post('/addMidfielder',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.midfielders,
      {$addToSet: {midfielders: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.midfielders  
      )
      .then(data => {
        res.json(data.midfielders);
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

fantasyClubRouter.post('/removeMidfielder',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.midfielders,
      {$pull: {midfielders: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.midfielders
      )
      .then(data => {
        res.json(data.midfielders);
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

fantasyClubRouter.post('/addStarter', 
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.starters,
      {$addToSet: {starters: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.starters
      )
      .then(data => {
        res.json(data.starters);
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

fantasyClubRouter.post('/removeStarter', 
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.starters,
      {$pull: {starters: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.starters
      )
      .then(data => {
        res.json(data.starters);
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

fantasyClubRouter.post('/addBench', 
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.benchwarmers,
      {$addToSet: {benchwarmers: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.benchwarmers
      )
      .then(data => {
        res.json(data.benchwarmers);
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

fantasyClubRouter.post('/removeBench', 
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      req.params.benchwarmers,
      {$pull: {benchwarmers: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        req.params.benchwarmers
      )
      .then(data => {
        res.json(data.benchwarmers);
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

fantasyClubRouter.put('/addClubName',
  (req, res) => {
    updateData(req.params.clubName,
      {
        clubName: req.body.clubName
      }, FantasyClub)
    .then(data => {
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