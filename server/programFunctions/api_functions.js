const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=',
    playerInfo = require('./playerInfo_function.js');

// this function returns the api leagueId for the selected leagueName, to be used when user selects type of fantasy league to play in
function leagueSelector(leagueName) {
  switch(leagueName) {
    case 'Premiere League (England)':
      return 8;
    case 'Championship (England)':
      return 9;
    case 'League One (England)':
      return 12;
    case 'League Two (England)':
      return 14;
    case 'Eredivise (Netherlands)':
      return 72;
    case 'Eerste Divisie (Netherlands)':
      return 74;
    case 'Bundesliga (Germany)':
      return 82;
    case '2.Bundesliga (Germany)':
      return 85;
    case 'Bundesliga (Austria)':
      return 181;
    case 'Jupiler Pro League (Belgium)':
      return 208;
    case 'Superliga (Denmark)':
      return 271;
    case 'Ligue 1 (France)':
      return 301;
    case 'Ligue 2 (France)':
      return 304;
    case 'Super League (Greece)':
      return 325;
    case 'Urvalsdeild (Iceland)':
      return 345;
    case 'Premiere Division (Ireland)':
      return 360;
    case 'Serie A (Italy)':
      return 384;
    case 'Serie B (Italy)':
      return 387;
    case 'Premiership (Northern Ireland)':
      return 438;
    case 'Tippeligaen (Norway)':
      return 444;
    case 'Ekstraklasa (Poland)':
      return 453;
    case 'Primeira Liga (Portugal)':
      return 462;
    case 'Premiere League (Russia)':
      return 486;
    case 'Premiership (Scotland)':
      return 501;
    case 'Championship (Scotland)':
      return 504;
    case 'La Liga (Spain)':
      return 564;
    case 'Segunda Division (Spain)':
      return 567;
    case 'Allsvenskan (Sweden)':
      return 573;
    case 'Superettan (Sweden)':
      return 579;
    case 'Super League (Switzerland)':
      return 591;
    case 'Super Lig (Turkey)':
      return 600;
    case 'Premiere League (Wales)':
      return 624;
    case 'Primera Division (Argentina)':
      return 636;
    case 'Primera B (Argentina)':
      return 639;
    case 'Serie A (Brazil)':
      return 648;
    case 'Serie B (Brazil)':
      return 651;
    case 'Primera Division (Chile)':
      return 663;
    case 'Primera A: Apertura (Colombia)':
      return 672;
    case 'Primera A: Clausura (Colombia)':
      return 675;
    case 'Primera A: Apertura (Ecuador)':
      return 693;
    case 'Primera A: Clausura (Ecuador)':
      return 696;
    case 'Liga MX (Mexico)':
      return 743;
    case 'Major League Soccer (USA)':
      return 779;
    case 'J-League (Japan)':
      return 968;
    case 'Super League (China)':
      return 989;
    case 'Indian Super League (India)':
      return 1007;
    case 'Liga de Futbol Profesional (Bolivia)':
      return 1098;
    case 'A-League (Australia)':
      return 1356;
  }
}

// leagueSelector();

// combine the following two functions into one beautiful beast

// this function returns all players and their stats for a league's current regular season
// game, match, and fixture are same thing
function playerStatsByLeague(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    included = `${toInclude}fixtures,season.stages.rounds.fixtures.lineup,season.stages.rounds.fixtures.bench,season.stages.rounds.fixtures.localTeam.squad,season.stages.rounds.fixtures.visitorTeam.squad,season.stages.rounds.fixtures.goals`,
    results = {
      uri: `${endpoint}${leagueId}${key}${included}`,
      json: true
    };
    
  return rp(results)
  .then(results => {
    let allData = {
      playerMasterList: [],
      roundsData: []
    };
    console.log(results);
    results.data.season.data.stages.data.forEach(stage => {
      //because we only want regular seasons, not playoffs or cup matches
      if (stage.name === 'Regular Season') {
        allData.stageId = stage.id;
        // this part is to make a master list of all players in the league
        let playerIdList = [];
        stage.rounds.data.forEach(round => {
          round.fixtures.data.forEach(fixture => {
            fixture.localTeam.data.squad.data.forEach(player => {
              console.log('player');
              console.log(player.player_id);
              playerIdList.push(player.player_id);
            });
          });
        });
        playerIdList = [... new Set(playerIdList)];
        playerIdList.forEach(playerId => {
          const endpoint2 = `${baseURL}/players/`,
            included2 = `${toInclude}team,position`,
            results2 = {
              uri: `${endpoint2}${playerId}${key}${included2}`,
              json: true
            };
          
          return rp(results2)
          .then(results2 => {
            let playerInfo2 = {
              id: results2.data.player_id,
              commonName: results2.data.player_name,
              fullName: results2.data.fullname,
              firstName: results2.data.firstname,
              lastName: results2.data.lastname,
              playerPosition: results2.data.position.data.name,
              playerPicture: results2.data.image_path,
              playerClubId: results2.data.team.data.id,
              playerClubName: results2.data.team.data.name,
              playerClubLogo: results2.data.team.data.logo_path
            };
            console.log('playerMasterList', allData.playerMasterList);
            return allData.playerMasterList.push(playerInfo2);
          })
          .catch(error => {
            console.log(`playerIdList search error: ${error}`);
          });
        });
        
        stage.rounds.data.forEach(round => {
          if (round.stage_id === allData.stageId && round.fixtures.data.length > 0) { // round.stage_id if statement
            let roundInfo = {
              name: round.name,
              id: round.id,
              start: round.start,
              end: round.end,
              fixtures: []
            };
            round.fixtures.data.forEach(fixture => {
              let fixtureInfo = {
                id: fixture.id,
                homeClubName: fixture.localTeam.data.name,
                homeClubId: fixture.localTeam.data.id,
                homeClubLogo: fixture.localTeam.data.logo_path,
                homeClubScore: fixture.scores.localteam_score,
                awayClubName: fixture.visitorTeam.data.name,
                awayClubId: fixture.visitorTeam.data.id,
                awayClubLogo: fixture.visitorTeam.data.logo_path,
                awayClubScore: fixture.scores.visitorTeam_score,
                status: fixture.time.status,
                lineup: [],
                bench: []
              };
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
                let starterInfo = playerInfo(starter, fixture, ownGoalList);
                starterInfo.fantasyPointsCalc();
                fixtureInfo.lineup.push(starterInfo);
              });
              
              fixture.bench.data.forEach(bencher => {
                let bencherInfo = playerInfo(bencher, fixture, ownGoalList);
                bencherInfo.fantasyPointsCalc();
                fixtureInfo.bench.push(bencherInfo);
              });
              roundInfo.fixtures.push(fixtureInfo);
            }); // close of round.fixtures.data.forEach
            allData.roundsData.push(roundInfo);
          } // close of round.stage_id if statement
        }); // close of stage.rounds.data.forEach
      }
    });
    return allData;
  })
  .catch(error => {
    console.log(`playerStatsByLeague error: ${error}`);
  });
}

playerStatsByLeague(779);

exports.leagueSelector = leagueSelector;
exports.playerStatsByLeague = playerStatsByLeague;