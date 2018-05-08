const mongoose = require("mongoose"),
	fantasyClubRouter = require("express").Router(),
	FantasyClub = require('../models/fantasyClub_model.js');

fantasyClubRouter.get('/:manager', 
  (req, res) => {
    FantasyClub
    .findOne({manager: req.params.manager})
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

fantasyClubRouter.post('/addStarter/:userId', 
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
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

fantasyClubRouter.post('/removeStarter/:userId', 
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
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

fantasyClubRouter.post('/addBench/:userId', 
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
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

fantasyClubRouter.post('/removeBench/:userId', 
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
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

exports.fantasyClubRouter = fantasyClubRouter;