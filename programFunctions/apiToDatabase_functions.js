const createData = require('./crud_functions.js').createData,
	readData = require('./crud_functions.js').readData,
	updateData = require('./crud_functions.js').updateData,
	deleteData = require('./crud_functions.js').deleteData,
	allLeagueIds = require('./api_functions.js').allLeagueIds,
	seasonByLeague = require('./api_functions.js').seasonByLeague,
	matchesByLeagueSeason = require('./api_functions.js').matchesByLeagueSeason,
	playerStatsByMatch = require('./api_functions.js').playerStatsByMatch,
	Player = require('../models/player_model.js'),
	config = require('../config.js'),
	database = `${config.DATABASE_URL}/collections/players`;
	
function playerInfo(leagueId) {
  return seasonByLeague(leagueId)
  .then(seasonId => {
    // console.log(`seasonId: ${seasonId}`);
     return matchesByLeagueSeason(seasonId)
      .then(matchIdList => {
        // console.log(`fixtureIdList: ${matchIdList.length}`);
        matchIdList.forEach(matchId => {
          return playerStatsByMatch(matchId)
          .then(matchData => {
            console.log(matchData.lineup);
            for (let i = 0; i < matchData.lineup.length; i++) {
              let player = {
                playerName: matchData.lineup[i].player_name,
                playerIdFromAPI: matchData.lineup[i].player_id,
                playerPosition: matchData.lineup[i].position,
                playerClubIdFromAPI: matchData.lineup[i].team_id,
                playerClub: matchData.lineup[i].team_id === matchData.homeClub.id ? matchData.homeClub.name : matchData.awayClub.name,
                playerStats: {
                  minutesPlayed: matchData.lineup[i].stats.other.minutes_played,
                  goalsScored: matchData.lineup[i].stats.goals.scored,
                  goalsConceded: matchData.lineup[i].stats.goals.conceded,
                  assists: matchData.lineup[i].stats.other.assists,
              		shotsTaken: matchData.lineup[i].stats.shots.shots_taken,
              		shotsOnGoal: matchData.lineup[i].stats.shots.shots_on_goal,
              		foulsDrawn: matchData.lineup[i].stats.fouls.drawn,
              		foulsCommitted: matchData.lineup[i].stats.fouls.committed,
              		yellowCards: matchData.lineup[i].stats.cards.yellowcards,
              		redCards: matchData.lineup[i].stats.cards.redcards,
              		passes: matchData.lineup[i].stats.passing.passes,
              		passingAccuracy: matchData.lineup[i].stats.passing.passes_accuracy,
              		crosses: matchData.lineup[i].stats.passing.total_crosses,
              		crossingAccuracy: matchData.lineup[i].stats.passing.crosses_accuracy,
              		timesOffside: matchData.lineup[i].stats.other.offsides,
              		saves: matchData.lineup[i].stats.other.saves,
              		penaltiesScored: matchData.lineup[i].stats.other.pen_scored,
              		penaltiesMissed: matchData.lineup[i].stats.other.pen_missed,
              		tackles: matchData.lineup[i].stats.other.tackles,
              		blocks: matchData.lineup[i].stats.other.blocks,
              		interceptions: matchData.lineup[i].stats.other.interceptions,
              		clearances: matchData.lineup[i].stats.other.clearances
                },
                playerSchedule: null,
                playerValue: null,
                playerFantasyPointsWeek: null,
                playerFantasyPointsTotal: null
              };
              console.log(seasonId);
            }
          })
          .catch(error => {
            console.log(`playerInfo playerStatsByMatch error: ${error}`);
          });
        });
      })
      .catch(error => {
        console.log(`playerInfo fixturesByLeagueSeason error: ${error}`);
      });
  })
  .catch(error => {
    console.log(`playerInfo error: ${error}`);
  });
}

playerInfo(779);