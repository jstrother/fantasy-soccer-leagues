const rp = require('request-promise'),
  key = require('../config.js').API_KEY,
  baseURL = 'https://soccer.sportmonks.com/api/v2.0',
  toInclude = '&include=',
  { updateData } = require('./updateData_function.js'),
  loopFunction = require('./loopFunction_function.js'),
  playerStats = require('./playerStats_function.js'),
  Player = require('../../models/player_model.js'),
  Clubs = require("../../models/clubs_model.js");


// this function returns all players and their stats for a league's current regular season
// game, match, and fixture are same thing
function playerStatsByLeague(leagueId) {
  let leagueResults = endpointCreator('leagues', leagueId, 'season.stages.rounds.fixtures'),
    today = dateCalc(); // we need today's date to be calculated each time we loop through league IDs
    
  return rp(leagueResults)
  .then(leagueData => {
    //because we only want current regular seasons, not older seasons, playoffs, or cup matches
    if (leagueData.data.season.data.is_current_season === true && leagueData.data.season.data.stages.data[0].name === 'Regular Season') {
      let fixtureIdList = [],
        ownGoalList = [];
      
      // this is where and how we get ids for each match in a season, but we check to see if today's date is in the round.start - round.end range.  this helps to limit number of API calls each hour.
      leagueData.data.season.data.stages.data[0].rounds.data.forEach(round => {
        // the Date.parse() below gives us the milliseconds since the start of the epoch, which makes comparison a little easier
        const start = Date.parse(round.start),
          current = Date.parse(today),
          end = Date.parse(round.end);
        
        if (start <= current && current <= end) {
          round.fixtures.data.forEach(fixture => {
            fixtureIdList.push(fixture.id);
          });
        }
      });
      
      // using the fixture ids from the last function, we need to get info on each player in that game
      fixtureIdList.forEach(fixtureId => {
        let fixtureResults = endpointCreator('fixtures', fixtureId, 'localTeam.squad,visitorTeam.squad,goals,lineup,bench,sidelined,stats');
        
        return rp(fixtureResults)
        .then(fixtureData => {
          let playerIdList = []; // this array creates a master list of player IDs
          const fixtureBasics = {
            leagueId: fixtureData.data.league_id,
            roundId: fixtureData.data.round_id,
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
          });
          
          fixtureData.data.bench.data.forEach(player => {
            playerInfo(player, fixtureBasics, ownGoalList);
          });
          playerIdList = [... new Set(playerIdList)]; // this is to ensure there is only one of each player ID in the list
          return playerIdList;
          
          function playerInfo(player, fixtureData, ownGoalList) {
            let playerInfoData = playerStats(player, fixtureData, ownGoalList);
            playerInfoData.ownGoalCalc();
            playerInfoData.fantasyPointsCalc();
            console.log('playerId from playerInfo:', playerInfoData.idFromAPI);
            updateData(
              {
                idFromAPI: playerInfoData.idFromAPI
              },
              playerInfoData,
              Player
            );
            playerIdList.push(playerInfoData.idFromAPI);
          }
        })
        .then(playerIdList => {
          loopFunction(playerIdList, playerIdRetrieve, 300, false);
          
          function playerIdRetrieve(playerId) {
            if (playerId == undefined) {
              console.log('playerId is undefined');
              return;
            }
            console.log(`playerIdRetrieve: ${playerId}`);
            let playerResults = endpointCreator('players', playerId, 'team,position,sidelined,stats');
            
            return rp(playerResults)
            .then(playerData => {
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
              updateData(
                {
                  idFromAPI: playerData.idFromAPI
                },
                playerInfo,
                Player
              );
            })
            .catch(error => {
              throw new Error(error);
            });
          }
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
  
  function dateCalc() {
    let today = new Date(),
      day = today.getUTCDate(), // we are grabbing the UTC date as the API uses UTC dates
      month = today.getUTCMonth() + 1, // remember! January is month 0!
      year = today.getUTCFullYear();
    
    if (day < 10) {
      day = `0${day}`;
    }
    
    if (month < 10) {
      month = `0${month}`;
    }
    
    today = `${year}-${month}-${day}`;
    return today;
  }
}

module.exports = playerStatsByLeague;