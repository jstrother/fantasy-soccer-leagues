const rp = require('request-promise'),
  key = require('../config.js').API_KEY,
  baseURL = 'https://soccer.sportmonks.com/api/v2.0',
  toInclude = '&include=',
  loopFunction = require('./loopFunction_function.js'),
  playerStats = require('./playerStats_function.js'),
  Player = require('../../models/player_model.js');


// this function returns all players and their stats for a league's current regular season
// game, match, and fixture are same thing
function playerStatsByLeague(leagueId) {
  let leagueResults = endpointCreator('leagues', leagueId, 'season.stages.rounds.fixtures');
    
  return rp(leagueResults)
  .then(leagueData => {
    //because we only want current regular seasons, not older seasons, playoffs, or cup matches
    if (leagueData.data.season.data.is_current_season === true && leagueData.data.season.data.stages.data[0].name === 'Regular Season') {
      console.log('into the if statement');
      let fixtureIdList = [],
        ownGoalList = [];
      
      // this is where and how we get ids for each match in a season, whether it has been played, is being played, or has not yet been played  
      leagueData.data.season.data.stages.data[0].rounds.data.forEach(round => {
        round.fixtures.data.forEach(fixture => {
          fixtureIdList.push(fixture.id);
        });
      });
      
      // using the fixture ids from the last function, we need to get info on each player in that game
      fixtureIdList.forEach(fixtureId => {
        let fixtureResults = endpointCreator('fixtures', fixtureId, 'localTeam.squad,visitorTeam.squad,goals,lineup,bench,sidelined,stats');
        
        return rp(fixtureResults)
        .then(fixtureData => {
          const fixtureBasics = {
            leagueId: fixtureData.data.league_id,
            localTeamId: fixtureData.data.localteam_id,
            localTeamScore: fixtureData.data.scores.localteam_score,
            visitorTeamId: fixtureData.data.visitorteam_id,
            visitorTeamScore: fixtureData.data.scores.visitorteam_score
          };
          fixtureData.data.goals.data.forEach(goal => {
            if (goal.type !== 'goal') {
              let ownGoal = {
                fixtureId: goal.fixture_id,
                playerId: goal.player_id
              };
              ownGoalList.push(ownGoal);
            }
          });
          fixtureData.data.lineup.data.forEach(player => {
            playerInfo(player, fixtureBasics, ownGoalList);
            playerIdRetrieve(player.player_id);
          });
          
          fixtureData.data.bench.data.forEach(player => {
            playerInfo(player, fixtureBasics, ownGoalList);
            playerIdRetrieve(player.player_id);
          });
        })
        .catch(error => {
          throw new Error(error);
        });
      });
    }
  })
  .catch(error => {
    throw new Error(error);
  });
}

function playerInfo(player, fixtureData, ownGoalList) {
  let playerInfoData = playerStats(player, fixtureData, ownGoalList);
  playerInfoData.ownGoalCalc();
  playerInfoData.fantasyPointsCalc();
  console.log('playerId from playerInfo:', playerInfoData.idFromAPI);
  Player.findOneAndUpdate({idFromAPI: playerInfoData.idFromAPI}, playerInfoData, {new: true, upsert: true});
}

function playerIdRetrieve(playerId) {
  console.log(`playerIdRetrieve: ${playerId}`);
  let playerResults = endpointCreator('players', playerId, 'team,position,sidelined,stats');
  
  return rp(playerResults)
  .then(playerData => {
    console.log('playerData:', playerData.data.stats.data);
    let playerInfo = {
      idFromAPI: playerData.data.player_id,
      commonName: playerData.data.player_name,
      fullName: playerData.data.fullname,
      firstName: playerData.data.firstname,
      lastName: playerData.data.lastname,
      position: playerData.data.position.data.name,
      picture: playerData.data.image_path,
      clubName: playerData.data.team.data.name,
      clubId: playerData.data.team.data.id,
      clubLogo: playerData.data.team.data.logo_path
    };
    Player.findOneAndUpdate({idFromAPI: playerInfo.idFromAPI}, playerInfo, {new: true, upsert: true});
  })
  .catch(error => {
    throw new Error(error);
  });
}

function endpointCreator(specificEndpoint, uniqueId, includes) {
  if (typeof specificEndpoint !== 'string' || typeof uniqueId !== 'number' || typeof includes !== 'string') {
    console.log('check your types for endpointCreator function args: playerStatsByLeague_function.js');
    return;
  }
  
  // baseURL, key, and toInclude come from delcared consts at top of file
  const results = {
    uri: `${baseURL}/${specificEndpoint}/${uniqueId}${key}${toInclude}${includes}`,
    json: true
  };
  return results;
}

module.exports = playerStatsByLeague;