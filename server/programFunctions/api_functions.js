const rp = require('request-promise'),
  key = require('../config.js').API_KEY,
  baseURL = 'https://soccer.sportmonks.com/api/v2.0',
  toInclude = '&include=',
  playerInfo = require('./playerInfo_function.js'),
  Player = require('../../models/player_model.js'),
  createData = require('./crud_functions.js').createData,
	readData = require('./crud_functions.js').readData,
	updateData = require('./crud_functions.js').updateData,
	deleteData = require('./crud_functions.js').deleteData;

// this function returns the api leagueId for the selected leagueName, to be used when user selects type of fantasy league to play in
function leagueSelector(leagueName) {
  let leagueId;
  switch(leagueName) {
    case 'Premiere League (England)':
      leagueId = 8;
      break;
    case 'Championship (England)':
      leagueId = 9;
      break;
    case 'League One (England)':
      leagueId = 12;
      break;
    case 'League Two (England)':
      leagueId = 14;
      break;
    case 'Eredivise (Netherlands)':
      leagueId = 72;
      break;
    case 'Eerste Divisie (Netherlands)':
      leagueId = 74;
      break;
    case 'Bundesliga (Germany)':
      leagueId = 82;
      break;
    case '2.Bundesliga (Germany)':
      leagueId = 85;
      break;
    case 'Bundesliga (Austria)':
      leagueId = 181;
      break;
    case 'Jupiler Pro League (Belgium)':
      leagueId = 208;
      break;
    case 'Superliga (Denmark)':
      leagueId = 271;
      break;
    case 'Ligue 1 (France)':
      leagueId = 301;
      break;
    case 'Ligue 2 (France)':
      leagueId = 304;
      break;
    case 'Super League (Greece)':
      leagueId = 325;
      break;
    case 'Urvalsdeild (Iceland)':
      leagueId = 345;
      break;
    case 'Premiere Division (Ireland)':
      leagueId = 360;
      break;
    case 'Serie A (Italy)':
      leagueId = 384;
      break;
    case 'Serie B (Italy)':
      leagueId = 387;
      break;
    case 'Premiership (Northern Ireland)':
      leagueId = 438;
      break;
    case 'Tippeligaen (Norway)':
      leagueId = 444;
      break;
    case 'Ekstraklasa (Poland)':
      leagueId = 453;
      break;
    case 'Primeira Liga (Portugal)':
      leagueId = 462;
      break;
    case 'Premiere League (Russia)':
      leagueId = 486;
      break;
    case 'Premiership (Scotland)':
      leagueId = 501;
      break;
    case 'Championship (Scotland)':
      leagueId = 504;
      break;
    case 'La Liga (Spain)':
      leagueId = 564;
      break;
    case 'Segunda Division (Spain)':
      leagueId = 567;
      break;
    case 'Allsvenskan (Sweden)':
      leagueId = 573;
      break;
    case 'Superettan (Sweden)':
      leagueId = 579;
      break;
    case 'Super League (Switzerland)':
      leagueId = 591;
      break;
    case 'Super Lig (Turkey)':
      leagueId = 600;
      break;
    case 'Premiere League (Wales)':
      leagueId = 624;
      break;
    case 'Primera Division (Argentina)':
      leagueId = 636;
      break;
    case 'Primera B (Argentina)':
      leagueId = 639;
      break;
    case 'Serie A (Brazil)':
      leagueId = 648;
      break;
    case 'Serie B (Brazil)':
      leagueId = 651;
      break;
    case 'Primera Division (Chile)':
      leagueId = 663;
      break;
    case 'Primera A: Apertura (Colombia)':
      leagueId = 672;
      break;
    case 'Primera A: Clausura (Colombia)':
      leagueId = 675;
      break;
    case 'Primera A: Apertura (Ecuador)':
      leagueId = 693;
      break;
    case 'Primera A: Clausura (Ecuador)':
      leagueId = 696;
      break;
    case 'Liga MX (Mexico)':
      leagueId = 743;
      break;
    case 'Major League Soccer (USA)':
      leagueId = 779;
      break;
    case 'J-League (Japan)':
      leagueId = 968;
      break;
    case 'Super League (China)':
      leagueId = 989;
      break;
    case 'Indian Super League (India)':
      leagueId = 1007;
      break;
    case 'Liga de Futbol Profesional (Bolivia)':
      leagueId = 1098;
      break;
    case 'A-League (Australia)':
      leagueId = 1356;
      break;
  }
  return leagueId;
}

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
    
    results.data.season.data.stages.data.forEach(stage => {
      //because we only want regular seasons, not playoffs or cup matches
      if (stage.name === 'Regular Season') {
        seasonInfo.stageId = stage.id;
        
        let starterInfo = {},
          bencherInfo = {};
        starterInfo.fantasyPointsSeason = 0;
        bencherInfo.fantasyPointsSeason = 0;
        
        stage.rounds.data.forEach(round => {
          if (round.stage_id === seasonInfo.stageId && round.fixtures.data.length > 0) { // round.stage_id if statement to confirm only rounds of the right stage with actual fixtures are dealt with
            round.fixtures.data.forEach(fixture => {
              // all calculated own goals come from this list
              let ownGoalList = [];
              fixture.goals.data.forEach(goal => {
                if (goal.type === 'own-goal') {
                  let ownGoal = {
                    fixtureId: goal.fixture_id,
                    playerId: goal.player_id
                  };
                  ownGoalList.push(ownGoal);
                }
              });
              
              fixture.lineup.data.forEach(starter => {
                starterInfo = playerInfo(starter, fixture, ownGoalList);
                starterInfo.ownGoalCalc();
                starterInfo.fantasyPointsCalc();
                // if (starterInfo.fantasyPointsRound !== null && starterInfo.fantasyPointsRound !== undefined) {
                //   starterInfo.fantasyPointsSeason += starterInfo.fantasyPointsRound;
                // }
                // else {
                //   starterInfo.fantasyPointsSeason += 0;
                // }
                updateData(starterInfo.idFromAPI, starterInfo, Player);
                console.log(`updated ${starterInfo.idFromAPI}`);
                playerIdList.push(starterInfo.idFromAPI);
              });
              
              // fixture.bench.data.forEach(bencher => {
              //   bencherInfo = playerInfo(bencher, fixture, ownGoalList);
              //   bencherInfo.ownGoalCalc();
              //   bencherInfo.fantasyPointsCalc();
              //   if (bencherInfo.fantasyPointsRound !== null) {
              //     bencherInfo.fantasyPointsSeason += bencherInfo.fantasyPointsRound;
              //   }
              //   updateData(bencherInfo.idFromAPI, bencherInfo, Player);
              //   console.log(`updated ${bencherInfo.idFromAPI}`);
              //   playerIdList.push(bencherInfo.idFromAPI);
              // });
            }); // close of round.fixtures.data.forEach
          } // close of round.stage_id if statement
        }); // close of stage.rounds.data.forEach
      }
    });
    playerIdList = [... new Set(playerIdList)];
    // playerIdList.forEach(playerId => {
    //   const endpoint2 = `${baseURL}/players/`,
    //     included2 = `${toInclude}team,position,sidelined`,
    //     results2 = {
    //       uri: `${endpoint2}${playerId}${key}${included2}`,
    //       json: true
    //     };
      
    //   return rp(results2)
    //   .then(results2 => {
    //     let playerInfo2 = {
    //       idFromAPI: results2.data.player_id,
    //       commonName: results2.data.player_name,
    //       fullName: results2.data.fullname,
    //       firstName: results2.data.firstname,
    //       lastName: results2.data.lastname,
    //       position: results2.data.position.data.name,
    //       picture: results2.data.image_path,
    //       clubName: results2.data.team.data.name,
    //       clubId: results2.data.team.data.id,
    //       clubLogo: results2.data.team.data.logo_path
    //     };
    //     // if(results2.data.sidelined.data !== []) {
    //     //   results2.data.sidelined.data.forEach(sidelined => {
    //     //     if (sidelined.start_date >= seasonInfo.startDate && sidelined.end_date <= seasonInfo.endDate) {
              
    //     //     }
    //     //   })
    //     // }
        
    //     updateData(playerInfo2, playerInfo2, Player);
    //   })
    //   .catch(error => {
    //     console.log(`playerIdList search error: ${error}`);
    //   });
    // });
    return seasonInfo;
  })
  .catch(error => {
    console.log(`playerStatsByLeague error: ${error}`);
  });
}

exports.leagueSelector = leagueSelector;
exports.playerStatsByLeague = playerStatsByLeague;