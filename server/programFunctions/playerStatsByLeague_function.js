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
  const endpoint = `${baseURL}/leagues/`,
    included = `${toInclude}season.stages.rounds.fixtures`,
    results = {
      uri: `${endpoint}${leagueId}${key}${included}`,
      json: true
    };
    
  return rp(results)
  .then(results => {
    let playerIdList = [];  // this is to help make a master list of all players in league
    
    //because we only want current regular seasons, not older seasons, playoffs, or cup matches
    if (results.data.season.data.is_current_season === true && results.data.season.data.stages.data[0].name === 'Regular Season') {
      console.log('into the if statement');
      let fixtureIdList = [],
        ownGoalList = [];
        
      results.data.season.data.stages.data[0].rounds.data.forEach(round => {
        round.fixtures.data.forEach(fixture => {
          fixtureIdList.push(fixture.id);
        });
      });
      
      fixtureIdList.forEach(fixtureId => {
        const fixtureEndpoint = `${baseURL}/fixtures/`,
          fixtureIncluded = `${toInclude}localTeam.squad,visitorTeam.squad,goals,lineup,bench,sidelined,stats`,
          fixtureResults = {
            uri: `${fixtureEndpoint}${fixtureId}${key}${fixtureIncluded}`,
            json: true
          };
        
        return rp(fixtureResults)
        .then(fixture => {
          const fixtureData = {
            leagueId: fixture.data.league_id,
            localTeamId: fixture.data.localteam_id,
            localTeamScore: fixture.data.scores.localteam_score,
            visitorTeamId: fixture.data.visitorteam_id,
            visitorTeamScore: fixture.data.scores.visitorteam_score
          };
          fixture.data.goals.data.forEach(goal => {
            if (goal.type !== 'goal') {
              let ownGoal = {
                fixtureId: goal.fixture_id,
                playerId: goal.player_id
              };
              ownGoalList.push(ownGoal);
            }
          });
          fixture.data.lineup.data.forEach(player => {
            playerInfo(player, fixtureData, ownGoalList);
          });
          
          fixture.data.bench.data.forEach(player => {
            playerInfo(player, fixtureData, ownGoalList);
          });
          
          // sometimes a playerId shows up multiple times. create a Set to get unique list of ids, and then convert back to array
          playerIdList = [... new Set(playerIdList)];
          console.log('playerIdList after Set:', playerIdList);
          
          function playerInfo(player, fixtureData, ownGoalList) {
            let playerInfoData = playerStats(player, fixtureData, ownGoalList);
            playerInfoData.ownGoalCalc();
            playerInfoData.fantasyPointsCalc();
            console.log('playerId from playerInfo:', playerInfoData.idFromAPI);
            Player.findOneAndUpdate({idFromAPI: playerInfoData.idFromAPI}, playerInfoData, {new: true, upsert: true});
            playerIdList.push(playerInfoData.idFromAPI);
          }
        })
        .catch(error => {
          throw new Error(error);
        });
      });
    }
    
    return playerIdList;
  })
  .then(playerIdList => {
    // using playerIdList, search through database for each player and then add fantasyPoints.round to fantasyPoints.season as this function runs once a day
    if (playerIdList !== undefined || playerIdList[0] !== null) {
      loopFunction(playerIdList, playerIdRetrieve, 333, false);
    }
    
    function playerIdRetrieve(playerId) {
      console.log(`playerIdRetrieve: ${playerId}`);
      const playerEndpoint = `${baseURL}/players/`,
        playerIncluded = `${toInclude}team,position,sidelined,stats`,
        playerResults = {
          uri: `${playerEndpoint}${playerId}${key}${playerIncluded}`,
          json: true
        };
      
      return rp(playerResults)
      .then(playerData => {
        console.log('playerData:', playerData.data.stats.data);
        let playerInfo2 = {
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
        Player.findOneAndUpdate({idFromAPI: playerInfo2.idFromAPI}, playerInfo2, {new: true, upsert: true});
      })
      .catch(error => {
        throw new Error(error);
      });
    }
  })
  .catch(error => {
    throw new Error(error);
  });
}

module.exports = playerStatsByLeague;