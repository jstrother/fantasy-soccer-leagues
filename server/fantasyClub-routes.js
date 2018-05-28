const mongoose = require("mongoose"),
	fantasyClubRouter = require("express").Router(),
	FantasyClub = require('../models/fantasyClub_model.js');

fantasyClubRouter.get('/:userId', 
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
      console.log('populatedClub:', populatedClub);
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

fantasyClubRouter.post('/addGoalkeeper/:userId',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
      {$addToSet: {goalkeepers: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        {manager: req.params.userId}  
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

fantasyClubRouter.post('/removeGoalkeeper/:userId',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
      {$pull: {goalkeepers: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        {manager: req.params.userId}
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

fantasyClubRouter.post('/addDefender/:userId',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
      {$addToSet: {defenders: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        {manager: req.params.userId}  
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

fantasyClubRouter.post('/removeDefender/:userId',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
      {$pull: {defenders: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        {manager: req.params.userId}
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

fantasyClubRouter.post('/addForward/:userId',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
      {$addToSet: {forwards: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        {manager: req.params.userId}  
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

fantasyClubRouter.post('/removeForward/:userId',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
      {$pull: {forwards: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        {manager: req.params.userId}  
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

fantasyClubRouter.post('/addMidfielder/:userId',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
      {$addToSet: {midfielders: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        {manager: req.params.userId}  
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

fantasyClubRouter.post('/removeMidfielder/:userId',
  (req, res) => {
    FantasyClub
    .findOneAndUpdate(
      {manager: req.params.userId},
      {$pull: {midfielders: req.body.player}}
    )
    .then(data => {
      FantasyClub
      .findOne(
        {manager: req.params.userId}
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
        {manager: req.params.userId}
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
        {manager: req.params.userId}
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
        {manager: req.params.userId}
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
        {manager: req.params.userId}
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