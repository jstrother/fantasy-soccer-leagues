const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=';

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
    included = `${toInclude}season.stages.rounds.fixtures.lineup,season.stages.rounds.fixtures.bench,season.stages.rounds.fixtures.localTeam.squad,season.stages.rounds.fixtures.visitorTeam.squad,season.stages.rounds.fixtures.goals,season.stages.rounds.fixtures.substitutions`,
    results = {
      uri: `${endpoint}${leagueId}${key}${included}`,
      json: true
    };
    
  return rp(results)
  .then(results => {
    // console.log(results.data.season.data.stages.data[0].rounds.data[0].fixtures.data[0].localTeam.data.squad);
    let allData = {
      playerMasterList: [],
      roundsData: []
    };
    results.data.season.data.stages.data.forEach(stage => {
      //because we only want regular seasons, not playoffs or cup matches
      if (stage.name === 'Regular Season') {
        allData.stageId = stage.id;
        // this part is to make a master list of all players in the league
        let playerIdList = [];
        stage.rounds.data.forEach(round => {
          round.fixtures.data.forEach(fixture => {
            fixture.localTeam.data.squad.data.forEach(player => {
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
            let playerInfo = {
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
            console.log(allData.playerMasterList);
            return allData.playerMasterList.push(playerInfo);
          })
          .catch(error => {
            console.log(`playerIdList search error: ${error}`);
          });
        });
        
        stage.rounds.data.forEach(round => {
          let roundInfo = {};
          if (round.stage_id === allData.stageId && round.fixtures.data.length > 0) { // round.stage_id if statement
            roundInfo.name = round.name;
            roundInfo.id = round.id;
            roundInfo.start = round.start;
            roundInfo.end = round.end;
            roundInfo.fixtures = [];
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
              fixture.lineup.data.forEach(starter => {
                let starterInfo = {
                  id: starter.player_id,
                  name: starter.player_name,
                  position: starter.position,
                  clubId: starter.team_id,
                  stats: {
                    shots: {
                      shotsTotal: starter.stats.shots.shots_total === null 
                        ? 0 
                        : starter.stats.shots.shots_total,
                      shotsOnGoal: starter.stats.shots.shots_on_goal === null 
                        ? 0 
                        : starter.stats.shots.shots_on_goal
                    },
                    goals: {
                      scored: starter.stats.goals.scored === null 
                        ? 0 
                        : starter.stats.goals.scored,
                      conceded: starter.stats.goals.conceded === null 
                        ? 0 
                        : starter.stats.goals.conceded
                    },
                    fouls: {
                      drawn: starter.stats.fouls.drawn === null 
                        ? 0 
                        : starter.stats.fouls.drawn,
                      committed: starter.stats.fouls.committed === null 
                        ? 0 
                        : starter.stats.fouls.committed
                    },
                    cards: {
                      yellowCards: starter.stats.cards.yellowcards === null 
                        ? 0 
                        : starter.stats.cards.yellowcards,
                      redCards: starter.stats.cards.redcards === null 
                        ? 0 
                        : starter.stats.cards.redcards
                    },
                    passing: {
                      // the two accuracy stats here return numbers, but are to be treated as percentages
                      totalCrosses: starter.stats.passing.total_crosses === null 
                        ? 0 
                        : starter.stats.passing.total_crosses,
                      crossesAccuracy: starter.stats.passing.crosses_accuracy === null 
                        ? 0 
                        : starter.stats.passing.crosses_accuracy,
                      passes: starter.stats.passing.passes === null 
                        ? 0 
                        : starter.stats.passing.passes,
                      passingAccuracy: starter.stats.passing.passes_accuracy === null 
                        ? 0 
                        : starter.stats.passing.passes_accuracy
                    },
                    other: {
                      assists: starter.stats.other.assists === null 
                        ? 0 
                        : starter.stats.other.assists,
                      offsides: starter.stats.other.offsides === null 
                        ? 0 
                        : starter.stats.other.offsides,
                      saves: starter.stats.other.saves === null 
                        ? 0 
                        : starter.stats.other.saves,
                      penaltiesScored: starter.stats.other.pen_scored === null 
                        ? 0 
                        : starter.stats.other.pen_scored,
                      penaltiesMissed: starter.stats.other.pen_missed === null 
                        ? 0 
                        : starter.stats.other.pen_missed,
                      penaltiesSaved: starter.stats.other.pen_saved === null 
                        ? 0 
                        : starter.stats.other.pen_saved,
                      tackles: starter.stats.other.tackles === null 
                        ? 0 
                        : starter.stats.other.tackles,
                      blocks: starter.stats.other.blocks === null 
                        ? 0 
                        : starter.stats.other.blocks,
                      interceptions: starter.stats.other.interceptions === null 
                        ? 0 
                        : starter.stats.other.interceptions,
                      clearances: starter.stats.other.clearances === null 
                        ? 0 
                        : starter.stats.other.clearances,
                      minutesPlayed: starter.stats.other.minutes_played === null 
                        ? 0 
                        : starter.stats.other.minutes_played
                    }
                  },
                  fantasyPoints: 2 // gets 2 points for being a starter, players off of the bench have this start at 0
                }; // close of starterInfo object
                // fantasy points calculated 
                
                // minutes played
                if (starterInfo.stats.other.minutesPlayed >= 60) {
                  starterInfo.fantasyPoints += 2;
                }
                
                // goal scored: 5pts for midfielders and forwards, 6 points for goalkeepers and defenders
                if (starterInfo.stats.other.minutesPlayed >= 60) {
                  if (starterInfo.position === 'G' || starterInfo.position === 'D') {
                    starterInfo.fantasyPoints += starterInfo.stats.goals.scored * 6;
                  }
                  else {
                    starterInfo.fantasyPoints += starterInfo.stats.goals.scored * 5;
                  }
                }
                
                // goal conceded: -1pt for every 2 - goalkeepers and defenders only
                if (starterInfo.position === 'G' || starterInfo.position === 'D') {
                  if (starterInfo.stats.goals.conceded > 0) {
                    starterInfo.fantasyPoints += -(Math.floor((starterInfo.stats.goals.conceded / 2)));
                  }
                }
                
                // assists: 3pts for each assist
                starterInfo.fantasyPoints += starterInfo.stats.other.assists * 3;
                
                // clean sheets: 5pts for goalkeepers and defenders, 1pt for midfielders
                if (starterInfo.position === 'G' || starterInfo.position === 'D') {
                  if (starterInfo.clubId === fixture.localTeam.data.id && fixture.scores.visitorTeam_score === 0) {
                    starterInfo.fantasyPoints += 5;
                  }
                  else if (starterInfo.clubId === fixture.visitorTeam.data.id && fixture.scores.localTeam_score === 0) {
                    starterInfo.fantasyPoints += 5;
                  }
                }
                else if (starterInfo.position === 'M') {
                  if (starterInfo.clubId === fixture.localTeam.data.id && fixture.scores.visitorTeam_score === 0) {
                    starterInfo.fantasyPoints += 1;
                  }
                  else if (starterInfo.clubId === fixture.visitorTeam.data.id && fixture.scores.localTeam_score === 0) {
                    starterInfo.fantasyPoints += 1;
                  }
                }
                
                // penalty missed: -3pts
                starterInfo.fantasyPoints += -(starterInfo.stats.other.penaltiesMissed * 3);
                
                // penalty scored: 6pts
                starterInfo.fantasyPoints += (starterInfo.stats.other.penaltiesScored * 6);
                
                // penalty saved: 5pts
                starterInfo.fantasyPoints += (starterInfo.stats.other.penaltiesSaved * 5);
                
                // own goal: -2pts (waiting to see if api can give this data)
                // starterInfo.fantasyPoints -= ()
                
                // yellow cards: -1pt
                starterInfo.fantasyPoints += -starterInfo.stats.cards.yellowCards;
                
                // red cards: -3pts
                starterInfo.fantasyPoints += -(starterInfo.stats.cards.redCards * 3);
                
                // saves: 1pt - goalkeepers only
                if (starterInfo.position === 'G') {
                  starterInfo.fantasyPoints += starterInfo.stats.other.saves;
                }
                
                // passing accuracy: 1 pt for every 35 passes AND accuracy >= 85
                if (starterInfo.stats.passing.passes > 0 && starterInfo.stats.passing.passingAccuracy >= 85) {
                  starterInfo.fantasyPoints += Math.floor(starterInfo.stats.passing.passes / 35);
                }
                
                // shots taken: 1pt for every 4
                starterInfo.fantasyPoints += Math.floor(starterInfo.stats.shots.shotsTotal / 4);
                
                // shots on goal: 2pts for every 4
                starterInfo.fantasyPoints += (Math.floor(starterInfo.stats.shots.shotsOnGoal / 4) * 2);
                
                // fouls committed: -1pt for every 4
                starterInfo.fantasyPoints += -(Math.floor(starterInfo.stats.fouls.committed / 4));
                
                // fouls received: 1pt for every 4
                starterInfo.fantasyPoints += Math.floor(starterInfo.stats.fouls.committed / 4);
                
                // crosses: 1pt for every 3
                starterInfo.fantasyPoints += Math.floor(starterInfo.stats.passing.totalCrosses / 3);
                
                // clearances: 1pt for every 4
                starterInfo.fantasyPoints += Math.floor(starterInfo.stats.other.clearances / 4);
                
                // blocks: 1pt for every 2
                starterInfo.fantasyPoints += Math.floor(starterInfo.stats.other.blocks / 2);
                
                // interceptions: 1pt for every 4
                starterInfo.fantasyPoints += Math.floor(starterInfo.stats.other.interceptions / 4);
                
                // tackles: 1pt for every 4
                starterInfo.fantasyPoints += Math.floor(starterInfo.stats.other.tackles / 4);
                
                fixtureInfo.lineup.push(starterInfo);
              }); // close of fixture.lineup.data.forEach
              fixture.bench.data.forEach(bencher => {
                let bencherInfo = {
                  id: bencher.player_id,
                  name: bencher.player_name,
                  position: bencher.position,
                  clubId: bencher.team_id,
                  stats: {
                    shots: {
                      shotsTotal: bencher.stats.shots.shots_total === null 
                        ? 0 
                        : bencher.stats.shots.shots_total,
                      shotsOnGoal: bencher.stats.shots.shots_on_goal === null 
                        ? 0 
                        : bencher.stats.shots.shots_on_goal
                    },
                    goals: {
                      scored: bencher.stats.goals.scored === null 
                        ? 0 
                        : bencher.stats.goals.scored,
                      conceded: bencher.stats.goals.conceded === null 
                        ? 0 
                        : bencher.stats.goals.conceded
                    },
                    fouls: {
                      drawn: bencher.stats.fouls.drawn === null 
                        ? 0 
                        : bencher.stats.fouls.drawn,
                      committed: bencher.stats.fouls.committed === null 
                        ? 0 
                        : bencher.stats.fouls.committed
                    },
                    cards: {
                      yellowCards: bencher.stats.cards.yellowcards === null 
                        ? 0 
                        : bencher.stats.cards.yellowcards,
                      redCards: bencher.stats.cards.redcards === null 
                        ? 0 
                        : bencher.stats.cards.redcards
                    },
                    passing: {
                      // the two accuracy stats here return numbers, but are to be treated as percentages in your head
                      totalCrosses: bencher.stats.passing.total_crosses === null 
                        ? 0 
                        : bencher.stats.passing.total_crosses,
                      crossesAccuracy: bencher.stats.passing.crosses_accuracy === null 
                        ? 0 
                        : bencher.stats.passing.crosses_accuracy,
                      passes: bencher.stats.passing.passes === null 
                        ? 0 
                        : bencher.stats.passing.passes,
                      passingAccuracy: bencher.stats.passing.passes_accuracy === null 
                        ? 0 
                        : bencher.stats.passing.passes_accuracy
                    },
                    other: {
                      assists: bencher.stats.other.assists === null 
                        ? 0 
                        : bencher.stats.other.assists,
                      offsides: bencher.stats.other.offsides === null 
                        ? 0 
                        : bencher.stats.other.offsides,
                      saves: bencher.stats.other.saves === null 
                        ? 0 
                        : bencher.stats.other.saves,
                      penaltiesScored: bencher.stats.other.pen_scored === null 
                        ? 0 
                        : bencher.stats.other.pen_scored,
                      penaltiesMissed: bencher.stats.other.pen_missed === null 
                        ? 0 
                        : bencher.stats.other.pen_missed,
                      penaltiesSaved: bencher.stats.other.pen_saved === null 
                        ? 0 
                        : bencher.stats.other.pen_saved,
                      tackles: bencher.stats.other.tackles === null 
                        ? 0 
                        : bencher.stats.other.tackles,
                      blocks: bencher.stats.other.blocks === null 
                        ? 0 
                        : bencher.stats.other.blocks,
                      interceptions: bencher.stats.other.interceptions === null 
                        ? 0 
                        : bencher.stats.other.interceptions,
                      clearances: bencher.stats.other.clearances === null 
                        ? 0 
                        : bencher.stats.other.clearances,
                      minutesPlayed: bencher.stats.other.minutes_played === null 
                        ? 0 
                        : bencher.stats.other.minutes_played
                    }
                  },
                  fantasyPoints: 0 // gets 0 points for being a bencher, players who start the game have this begin at 2
                }; // close of bencherInfo object
                // fantasy points calculated 
                
                // minutes played
                if (bencherInfo.stats.other.minutesPlayed >= 60) {
                  bencherInfo.fantasyPoints += 2;
                }
                
                // goal scored: 5pts for midfielders and forwards, 6 points for goalkeepers and defenders
                if (bencherInfo.stats.other.minutesPlayed >= 60) {
                  if (bencherInfo.position === 'G' || bencherInfo.position === 'D') {
                    bencherInfo.fantasyPoints += bencherInfo.stats.goals.scored * 6;
                  }
                  else {
                    bencherInfo.fantasyPoints += bencherInfo.stats.goals.scored * 5;
                  }
                }
                
                // goal conceded: -1pt for every 2 - goalkeepers and defenders only
                if (bencherInfo.position === 'G' || bencherInfo.position === 'D') {
                  if (bencherInfo.stats.goals.conceded > 0) {
                    bencherInfo.fantasyPoints += -(Math.floor((bencherInfo.stats.goals.conceded / 2)));
                  }
                }
                
                // assists: 3pts for each assist
                bencherInfo.fantasyPoints += bencherInfo.stats.other.assists * 3;
                
                // clean sheets: 5pts for goalkeepers and defenders, 1pt for midfielders
                if (bencherInfo.position === 'G' || bencherInfo.position === 'D') {
                  if (bencherInfo.clubId === fixture.localTeam.data.id && fixture.scores.visitorTeam_score === 0) {
                    bencherInfo.fantasyPoints += 5;
                  }
                  else if (bencherInfo.clubId === fixture.visitorTeam.data.id && fixture.scores.localTeam_score === 0) {
                    bencherInfo.fantasyPoints += 5;
                  }
                }
                else if (bencherInfo.position === 'M') {
                  if (bencherInfo.clubId === fixture.localTeam.data.id && fixture.scores.visitorTeam_score === 0) {
                    bencherInfo.fantasyPoints += 1;
                  }
                  else if (bencherInfo.clubId === fixture.visitorTeam.data.id && fixture.scores.localTeam_score === 0) {
                    bencherInfo.fantasyPoints += 1;
                  }
                }
                
                // penalty missed: -3pts
                bencherInfo.fantasyPoints += -(bencherInfo.stats.other.penaltiesMissed * 3);
                
                // penalty scored: 6pts
                bencherInfo.fantasyPoints += (bencherInfo.stats.other.penaltiesScored * 6);
                
                // penalty saved: 5pts
                bencherInfo.fantasyPoints += (bencherInfo.stats.other.penaltiesSaved * 5);
                
                // own goal: -2pts (waiting to see if api can give this data)
                // bencherInfo.fantasyPoints -= ()
                
                // yellow cards: -1pt
                bencherInfo.fantasyPoints += -bencherInfo.stats.cards.yellowCards;
                
                // red cards: -3pts
                bencherInfo.fantasyPoints += -(bencherInfo.stats.cards.redCards * 3);
                
                // saves: 1pt - goalkeepers only
                if (bencherInfo.position === 'G') {
                  bencherInfo.fantasyPoints += bencherInfo.stats.other.saves;
                }
                
                // passing accuracy: 1 pt for every 35 passes AND accuracy >= 85
                if (bencherInfo.stats.passing.passes > 0 && bencherInfo.stats.passing.passingAccuracy >= 85) {
                  bencherInfo.fantasyPoints += Math.floor(bencherInfo.stats.passing.passes / 35);
                }
                
                // shots taken: 1pt for every 4
                bencherInfo.fantasyPoints += Math.floor(bencherInfo.stats.shots.shotsTotal / 4);
                
                // shots on goal: 2pts for every 4
                bencherInfo.fantasyPoints += (Math.floor(bencherInfo.stats.shots.shotsOnGoal / 4) * 2);
                
                // fouls committed: -1pt for every 4
                bencherInfo.fantasyPoints += -(Math.floor(bencherInfo.stats.fouls.committed / 4));
                
                // fouls received: 1pt for every 4
                bencherInfo.fantasyPoints += Math.floor(bencherInfo.stats.fouls.committed / 4);
                
                // crosses: 1pt for every 3
                bencherInfo.fantasyPoints += Math.floor(bencherInfo.stats.passing.totalCrosses / 3);
                
                // clearances: 1pt for every 4
                bencherInfo.fantasyPoints += Math.floor(bencherInfo.stats.other.clearances / 4);
                
                // blocks: 1pt for every 2
                bencherInfo.fantasyPoints += Math.floor(bencherInfo.stats.other.blocks / 2);
                
                // interceptions: 1pt for every 4
                bencherInfo.fantasyPoints += Math.floor(bencherInfo.stats.other.interceptions / 4);
                
                // tackles: 1pt for every 4
                bencherInfo.fantasyPoints += Math.floor(bencherInfo.stats.other.tackles / 4);
                
                fixtureInfo.bench.push(bencherInfo);
              }); // close of fixture.bench.data.forEach
              roundInfo.fixtures.push(fixtureInfo);
            }); // close of round.fixtures.data.forEach
            allData.roundsData.push(roundInfo);
          } // close of round.stage_id if statement
        }); // close of stage.rounds.data.forEach
      }
    });
    // console.log(allData.roundsData[0].fixtures[0].bench[0]);
    return allData;
  })
  .catch(error => {
    console.log(`playerStatsByLeague error: ${error}`);
  });
}

// playerStatsByLeague(779);

exports.leagueSelector = leagueSelector;
exports.playerStatsByLeague = playerStatsByLeague;