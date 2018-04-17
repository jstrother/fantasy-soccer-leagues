const rosterRouter = require("express").Router(),
  FantasyClub = require("../models/fantasyClub_model.js");
  
rosterRouter.post('/addGoalkeeper',
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

rosterRouter.post('/removeGoalkeeper',
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

rosterRouter.post('/addDefender',
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

rosterRouter.post('/removeDefender',
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

rosterRouter.post('/addForward',
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

rosterRouter.post('/removeForward',
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

rosterRouter.post('/addMidfielder',
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

rosterRouter.post('/removeMidfielder',
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

rosterRouter.post('/addStarter', 
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

rosterRouter.post('/removeStarter', 
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

rosterRouter.post('/addBench', 
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

rosterRouter.post('/removeBench', 
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

exports.rosterRouter = rosterRouter;