function playerStats(player, fixtureBasics, ownGoalList) {
  let seasonFantasyPoints,
    playerStatsObject = {
      idFromAPI: player.player_id,
      leagueId: fixtureBasics.leagueId,
      roundId: fixtureBasics.roundId,
      clubId: player.team_id === undefined 
        ? 0 
        : player.team_id,
      stats: {
        shots: {
          shotsTotal: player.stats.shots.shots_total === null 
            ? 0 
            : player.stats.shots.shots_total,
          shotsOnGoal: player.stats.shots.shots_on_goal === null 
            ? 0 
            : player.stats.shots.shots_on_goal
        },
        goals: {
          scored: player.stats.goals.scored === null 
            ? 0 
            : player.stats.goals.scored,
          conceded: player.stats.goals.conceded === null 
            ? 0 
            : player.stats.goals.conceded,
          ownGoals: 0
        },
        fouls: {
          drawn: player.stats.fouls.drawn === null 
            ? 0 
            : player.stats.fouls.drawn,
          committed: player.stats.fouls.committed === null 
            ? 0 
            : player.stats.fouls.committed
        },
        cards: {
          yellowCards: player.stats.cards.yellowcards === null 
            ? 0 
            : player.stats.cards.yellowcards,
          redCards: player.stats.cards.redcards === null 
            ? 0 
            : player.stats.cards.redcards
        },
        passing: {
          // the two accuracy stats here return numbers, but are to be treated as percentages
          totalCrosses: player.stats.passing.total_crosses === null 
            ? 0 
            : player.stats.passing.total_crosses,
          crossingAccuracy: player.stats.passing.crosses_accuracy === null 
            ? 0 
            : player.stats.passing.crosses_accuracy,
          totalPasses: player.stats.passing.passes === null 
            ? 0 
            : player.stats.passing.passes,
          passingAccuracy: player.stats.passing.passes_accuracy === null 
            ? 0 
            : player.stats.passing.passes_accuracy
        },
        other: {
          assists: player.stats.other.assists === null 
            ? 0 
            : player.stats.other.assists,
          offsides: player.stats.other.offsides === null 
            ? 0 
            : player.stats.other.offsides,
          saves: player.stats.other.saves === null 
            ? 0 
            : player.stats.other.saves,
          penaltiesScored: player.stats.other.pen_scored === null 
            ? 0 
            : player.stats.other.pen_scored,
          penaltiesMissed: player.stats.other.pen_missed === null 
            ? 0 
            : player.stats.other.pen_missed,
          penaltiesSaved: player.stats.other.pen_saved === null 
            ? 0 
            : player.stats.other.pen_saved,
          tackles: player.stats.other.tackles === null 
            ? 0 
            : player.stats.other.tackles,
          blocks: player.stats.other.blocks === null 
            ? 0 
            : player.stats.other.blocks,
          interceptions: player.stats.other.interceptions === null 
            ? 0 
            : player.stats.other.interceptions,
          clearances: player.stats.other.clearances === null 
            ? 0 
            : player.stats.other.clearances,
          minutesPlayed: player.stats.other.minutes_played === null 
            ? 0 
            : player.stats.other.minutes_played
        }
      },
      fantasyPoints: {
        fixture: player === 'starter' ? 2 : 0, // players classed as 'starters' earn 2 extra points over those classed 'benchwarmers' or 'reserves'
        season: seasonFantasyPoints === undefined ? 0 : seasonFantasyPoints
      },
      ownGoalCalc: function() {
        ownGoalList.forEach(ownGoal => {
          if (ownGoal !== undefined) {
            if (ownGoal.fixtureId === this.fixtureId && ownGoal.playerId === this.idFromAPI) {
              this.stats.goals.ownGoals += 1;
            }
          }
        });
      },
      fantasyPointsCalc: function() {
        // fantasy points calculated 
        
        // minutes played
        if (this.stats.other.minutesPlayed >= 60) {
          this.fantasyPoints.fixture += 2;
        }
        
        // goal scored: 5pts for midfielders and forwards, 6 points for goalkeepers and defenders
        if (this.stats.other.minutesPlayed >= 60) {
          if (this.position === 'G' || this.position === 'D') {
            this.fantasyPoints.fixture += this.stats.goals.scored * 6;
          }
          else {
            this.fantasyPoints.fixture += this.stats.goals.scored * 5;
          }
        }
        
        // goal conceded: -1pt for every 2 - goalkeepers and defenders only
        if (this.position === 'G' || this.position === 'D') {
          if (this.stats.goals.conceded > 0) {
            this.fantasyPoints.fixture += -(Math.floor((this.stats.goals.conceded / 2)));
          }
        }
        
        // assists: 3pts for each assist
        this.fantasyPoints.fixture += this.stats.other.assists * 3;
        
        // clean sheets: 5pts for goalkeepers and defenders, 1pt for midfielders
        if (this.position === 'G' || this.position === 'D') {
          if (this.clubId === fixtureBasics.localTeamId && fixtureBasics.visitorTeamScore === 0) {
            this.fantasyPoints.fixture += 5;
          }
          else if (this.clubId === fixtureBasics.visitorTeamId && fixtureBasics.localTeamScore === 0) {
            this.fantasyPoints.fixture += 5;
          }
        }
        else if (this.position === 'M') {
          if (this.clubId === fixtureBasics.localTeamId && fixtureBasics.visitorTeamScore === 0) {
            this.fantasyPoints.fixture += 1;
          }
          else if (this.clubId === fixtureBasics.visitorTeamId && fixtureBasics.localTeamScore === 0) {
            this.fantasyPoints.fixture += 1;
          }
        }
        
        // penalty missed: -3pts
        this.fantasyPoints.fixture += -(this.stats.other.penaltiesMissed * 3);
        
        // penalty scored: 6pts
        this.fantasyPoints.fixture += (this.stats.other.penaltiesScored * 6);
        
        // penalty saved: 5pts
        this.fantasyPoints.fixture += (this.stats.other.penaltiesSaved * 5);
        
        // own goal: -2pts
        this.fantasyPoints.fixture += -(this.stats.goals.ownGoals * 2);
        
        // yellow cards: -1pt
        this.fantasyPoints.fixture += -this.stats.cards.yellowCards;
        
        // red cards: -3pts
        this.fantasyPoints.fixture += -(this.stats.cards.redCards * 3);
        
        // saves: 1pt - goalkeepers only
        if (this.position === 'G') {
          this.fantasyPoints.fixture += this.stats.other.saves;
        }
        
        // passing accuracy: 1 pt for every 35 passes AND accuracy >= 85
        if (this.stats.passing.totalPasses > 0 && this.stats.passing.passingAccuracy >= 85) {
          this.fantasyPoints.fixture += Math.floor(this.stats.passing.totalPasses / 35);
        }
        
        // shots taken: 1pt for every 4
        this.fantasyPoints.fixture += Math.floor(this.stats.shots.shotsTotal / 4);
        
        // shots on goal: 2pts for every 4
        this.fantasyPoints.fixture += (Math.floor(this.stats.shots.shotsOnGoal / 4) * 2);
        
        // fouls committed: -1pt for every 4
        this.fantasyPoints.fixture += -(Math.floor(this.stats.fouls.committed / 4));
        
        // fouls received: 1pt for every 4
        this.fantasyPoints.fixture += Math.floor(this.stats.fouls.committed / 4);
        
        // crosses: 1pt for every 3
        this.fantasyPoints.fixture += Math.floor(this.stats.passing.totalCrosses / 3);
        
        // clearances: 1pt for every 4
        this.fantasyPoints.fixture += Math.floor(this.stats.other.clearances / 4);
        
        // blocks: 1pt for every 2
        this.fantasyPoints.fixture += Math.floor(this.stats.other.blocks / 2);
        
        // interceptions: 1pt for every 4
        this.fantasyPoints.fixture += Math.floor(this.stats.other.interceptions / 4);
        
        // tackles: 1pt for every 4
        this.fantasyPoints.fixture += Math.floor(this.stats.other.tackles / 4);
        
        seasonFantasyPoints += this.fantasyPoints.fixture;
      }
    };
  
  return playerStatsObject;
}

module.exports = playerStats;