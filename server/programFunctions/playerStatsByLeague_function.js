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
    included = `${toInclude}season.stages.rounds.fixtures.lineup,season.stages.rounds.fixtures.bench,season.stages.rounds.fixtures.localTeam.squad,season.stages.rounds.fixtures.visitorTeam.squad,season.stages.rounds.fixtures.goals`,
    results = {
      uri: `${endpoint}${leagueId}${key}${included}`,
      json: true
    };
    
  return rp(results)
  .then(results => {
    let seasonInfo = {
      startDate: results.data.season.data.stages.data[0].rounds.data[0].start
    },
    playerIdList = [];  // this is to help make a master list of all players in league
    
    // the following little bit helps to find the end date of a season. the start and end are important
    const seasonLength = results.data.season.data.stages.data[0].rounds.data.length;
    for (let i = 0; i < seasonLength; i++) {
      if (results.data.season.data.stages.data[0].rounds.data[i].name === seasonLength) {
        seasonInfo.endDate = results.data.season.data.stages.data[0].rounds.data[i].end;
      }
    }
    
    if (results.data.season.data.is_current_season === true) {
      // console.log(results.data.season.data);
      const seasonEndpoint = `${baseURL}/teams/season/`,
        seasonIncluded = `${toInclude}squad`,
        seasonId = `${results.data.season.data.id}`,
        seasonResults = {
          uri: `${seasonEndpoint}${seasonId}${key}${seasonIncluded}`,
          json: true
        };
      
      return rp(seasonResults)
      .then(seasonData => {
        // console.log('squads:', seasonData.data[0].squad);
        playerIdRetrieve(581199);
        // seasonData.data[0].squad.data.forEach(player => {
        //   playerIdRetrieve(player.player_id);
        // });
      })
      .catch(error => {
        throw new Error(error);
      });
      // results.data.season.data.stages.data.forEach(stage => {
      //   //because we only want regular seasons, not playoffs or cup matches
      //   if (stage.name === 'Regular Season') {
      //     seasonInfo.stageId = stage.id;
      //     stage.rounds.data.forEach(round => {
      //       if (round.stage_id === seasonInfo.stageId && round.fixtures.data.length > 0) { // round.stage_id if statement to confirm only rounds of the right stage with actual fixtures are dealt with
      //         round.fixtures.data.forEach(fixture => {
      //           // all calculated own goals come from this list
      //           let ownGoalList = [];
      //           fixture.goals.data.forEach(goal => {
      //             if (goal.type === 'own-goal') {
      //               let ownGoal = {
      //                 fixtureId: goal.fixture_id,
      //                 playerId: goal.player_id
      //               };
      //               ownGoalList.push(ownGoal);
      //             }
      //           });
                
      //           fixture.lineup.data.forEach(starter => {
      //             playerInfo(starter, fixture, ownGoalList);
      //           });
                
      //           fixture.bench.data.forEach(benchwarmer => {
      //             playerInfo(benchwarmer, fixture, ownGoalList);
      //           });
                
      //           function playerInfo(type, fixture, ownGoalList) {
      //             let playerInfoData = playerStats(type, fixture, ownGoalList);
      //             playerInfoData.ownGoalCalc();
      //             playerInfoData.fantasyPointsCalc();
      //             Player.findOneAndUpdate({idFromAPI: playerInfoData.idFromAPI}, playerInfoData, {new: true, upsert: true});
      //             playerIdList.push(playerInfoData.idFromAPI);
      //           }
      //         }); // close of round.fixtures.data.forEach
      //       } // close of round.stage_id if statement
      //     }); // close of stage.rounds.data.forEach
      //   }
      // });
    }
    
    // sometimes a playerId shows up multiple times. create a Set to get unique list of ids, and then convert back to array
    playerIdList = [... new Set(playerIdList)];
    // using playerIdList, search through database for each player and then add fantasyPoints.round to fantasyPoints.season as this function runs once a day
    // if (playerIdList[0] !== null) {
    //   loopFunction(playerIdList, playerIdRetrieve, 333, false);
    // }
    
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
        // let playerInfo2 = {
        //   idFromAPI: playerData.data.player_id,
        //   commonName: playerData.data.player_name,
        //   fullName: playerData.data.fullname,
        //   firstName: playerData.data.firstname,
        //   lastName: playerData.data.lastname,
        //   position: playerData.data.position.data.name,
        //   picture: playerData.data.image_path,
        //   clubName: playerData.data.team.data.name,
        //   clubId: playerData.data.team.data.id,
        //   clubLogo: playerData.data.team.data.logo_path
        // };
        // Player.findOneAndUpdate({idFromAPI: playerInfo2.idFromAPI}, playerInfo2, {new: true, upsert: true});
      })
      .catch(error => {
        console.log(`playerIdList search error: ${error}`);
      });
    }
    
    return seasonInfo;
  })
  .catch(error => {
    console.log(`playerStatsByLeague error: ${error}`);
  });
}

module.exports = playerStatsByLeague;