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
    included = `${toInclude}season.stages.rounds.fixtures.lineup,season.stages.rounds.fixtures.bench,season.stages.rounds.fixtures.localTeam,season.stages.rounds.fixtures.visitorTeam,season.stages.rounds.fixtures.goals`,
    results = {
      uri: `${endpoint}${leagueId}${key}${included}`,
      json: true
    };
    
  return rp(results)
  .then(results => {
    console.log(results.data.season.data.stages.data[0].rounds.data[0].fixtures.data[0].goals.data);
    let allData = {
      playerMasterList: [],
      roundsData: []
    };
    results.data.season.data.stages.data.forEach(stage => {
      //because we only want regular seasons, not playoffs or cup matches
      if (stage.name === 'Regular Season') {
        allData.stageId = stage.id;
        // this part is to make a master list of all players in the league
        // but it's not working as expected
        // stage.rounds.data.forEach(round => {
        //   round.fixtures.data.forEach(fixture => {
        //     fixture.lineup.data.forEach(player => {
        //       let starterInfo = {
        //         id: player.player_id,
        //         name: player.player_name,
        //         position: player.position,
        //         playerClubId: player.team_id
        //       };
        //       if (!allData.playerMasterList.includes(starterInfo.id)) {
        //         allData.playerMasterList.push(starterInfo);
        //       }
        //     });
        //   });
        // });
        
        stage.rounds.data.forEach(round => {
          let roundInfo = {};
          if (round.stage_id === allData.stageId && round.fixtures.data.length > 0) { // double-conditional if statement
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
                lineup: []
              };
              fixture.lineup.data.forEach(starter => {
                let starterInfo = {
                  id: starter.player_id,
                  name: starter.player_name,
                  position: starter.position,
                  clubId: starter.team_id,
                  stats: {
                    shots: {
                      shotsTotal: starter.stats.shots.shots_total === null ? 0 : starter.stats.shots.shots_total,
                      shotsOnGoal: starter.stats.shots.shots_on_goal === null ? 0 : starter.stats.shots.shots_on_goal
                    },
                    goals: {
                      scored: starter.stats.goals.scored === null ? 0 : starter.stats.goals.scored,
                      conceded: starter.stats.goals.conceded === null ? 0 : starter.stats.goals.conceded
                    },
                    fouls: {
                      drawn: starter.stats.fouls.drawn === null ? 0 : starter.stats.fouls.drawn,
                      committed: starter.stats.fouls.committed === null ? 0 : starter.stats.fouls.committed
                    },
                    cards: {
                      yellowCards: starter.stats.cards.yellowcards === null ? 0 : starter.stats.cards.yellowcards,
                      redCards: starter.stats.cards.redcards === null ? 0 : starter.stats.cards.redcards
                    },
                    passing: {
                      // the two accuracy stats here return numbers, but are to be treated as percentages
                      totalCrosses: starter.stats.passing.total_crosses === null ? 0 : starter.stats.passing.total_crosses,
                      crossesAccuracy: starter.stats.passing.crosses_accuracy === null ? 0 : starter.stats.passing.crosses_accuracy,
                      passes: starter.stats.passing.passes === null ? 0 : starter.stats.passing.passes,
                      passingAccuracy: starter.stats.passing.passes_accuracy === null ? 0 : starter.stats.passing.passes_accuracy
                    },
                    other: {
                      assists: starter.stats.other.assists === null ? 0 : starter.stats.other.assists,
                      offsides: starter.stats.other.offsides === null ? 0 : starter.stats.other.offsides,
                      saves: starter.stats.other.saves === null ? 0 : starter.stats.other.saves,
                      penaltiesScored: starter.stats.other.pen_scored === null ? 0 : starter.stats.other.pen_scored,
                      penaltiesMissed: starter.stats.other.pen_missed === null ? 0 : starter.stats.other.pen_missed,
                      penaltiesSaved: starter.stats.other.pen_saved === null ? 0 : starter.stats.other.pen_saved,
                      tackles: starter.stats.other.tackles === null ? 0 : starter.stats.other.tackles,
                      blocks: starter.stats.other.blocks === null ? 0 : starter.stats.other.blocks,
                      interceptions: starter.stats.other.interceptions === null ? 0 : starter.stats.other.interceptions,
                      clearances: starter.stats.other.clearances === null ? 0 : starter.stats.other.clearances,
                      minutesPlayed: starter.stats.other.minutes_played === null ? 0 : starter.stats.other.minutes_played
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
              roundInfo.fixtures.push(fixtureInfo);
            }); // close of round.fixtures.data.forEach
            allData.roundsData.push(roundInfo);
          } // close of double-conditional if statement
        }); // close of stage.rounds.data.forEach
      }
    });
    // console.log(allData.roundsData[0].fixtures[0].lineup[0]);
    return allData;
  })
  .catch(error => {
    console.log(`playerStatsByLeague error: ${error}`);
  });
}

playerStatsByLeague(779);

exports.leagueSelector = leagueSelector;
exports.playerStatsByLeague = playerStatsByLeague;