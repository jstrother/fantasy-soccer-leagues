const express = require('express'),
	playerRouter = express.Router(),
	readData = require('./programFunctions/crud_functions.js').readData,
	Player = require('../models/player_model.js');
	
playerRouter.get('/:playerId', 
  (req, res) => {
    readData({playerId: req.params.playerId}, Player)
    .then(data => {
      console.log('data:', data);
      // res.json({
      //   idFromAPI: req.player.idFromAPI,
      //   commonName: req.player.commonName,
      //   fullName: req.player.fullName,
      //   firstName: req.player.firstName,
      //   lastName: req.player.lastName,
      //   position: req.player.position,
      //   picture: req.player.picture,
      //   leagueId: req.player.leagueId,
      //   clubName: req.player.clubName,
      //   clubId: req.player.clubId,
      //   clubLogo: req.player.clubLogo,
      //   stats: {
      //     shots: {
      //       shotsTotal: req.player.stats.shots.shotsTotal,
      //       shotsOnGoal: req.player.stats.shots.shotsOnGoal
      //     },
      //     goals: {
      //       scored: req.player.stats.goals.scored,
      //       conceded: req.player.stats.goals.conceded,
      //       ownGoals: req.player.stats.goals.ownGoals
      //     },
      //     fouls: {
      //       drawn: req.player.stats.fouls.drawn,
      //       committed: req.player.stats.fouls.committed
      //     },
      //     cards: {
      //       yellowCards: req.player.stats.cards.yellowCards,
      //       redCards: req.player.stats.cards.redCards
      //     },
      //     passing: {
      //       totalCrosses: req.player.stats.passing.totalCrosses,
      //       crossingAccuracy: req.player.stats.passing.crossingAccuracy,
      //       totalPasses: req.player.stats.passing.totalPasses,
      //       passingAccuracy: req.player.stats.passing.passingAccuracy
      //     },
      //     other: {
      //       assists: req.player.stats.other.assists,
      //       offsides: req.player.stats.other.offsides,
      //       saves: req.player.stats.other.saves,
      //       penaltiesScored: req.player.stats.other.penaltiesScored,
      //       penaltiesMissed: req.player.stats.other.penaltiesMissed,
      //       penaltiesSaved: req.player.stats.other.penaltiesSaved,
      //       tackles: req.player.stats.other.tackles,
      //       blocks: req.player.stats.other.blocks,
      //       interceptions: req.stats.other.interceptions,
      //       clearances: req.player.stats.other.clearances,
      //       minutesPlayed: req.player.stats.other.minutesPlayed
      //     }
      //   },
      //   fantasyPoints: {
      //     fixture: req.player.fantasyPoints.fixture,
      //     season: req.player.fantasyPoints.season
      //   }
      // })
    })
    .catch(error => {
      throw new Error(error);
    });
  }
);

exports.playerRouter = playerRouter;