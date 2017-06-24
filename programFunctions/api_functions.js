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

// this function returns the current season in a particular league
function seasonByLeague(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    included = `${toInclude}season.fixtures.lineup,season.fixtures.localTeam,season.fixtures.visitorTeam`,
    league = {
      uri: `${endpoint}${leagueId}${key}${included}`,
      json: true
    };
    
  return rp(league)
  .then(league => {
    console.log(league.data.season.data.fixtures.data[0]);
    return league.data.current_season_id;
  })
  .catch(error => {
    console.log(`seasonByLeague error: ${error}`);
  });
}

// seasonByLeague(779);

// retrieves player stats for each match in league season
// game, match, and fixture are same thing
function playersStatsByLeagueSeason(seasonId) {
  const endpoint = `${baseURL}/seasons/`,
    included = `${toInclude}rounds.fixtures.lineup,rounds.fixtures.localTeam,rounds.fixtures.visitorTeam,stages`, // fixtures must be left here as it is a part of the api json return
    result = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(result)
  .then(result => {
    // console.log(result.data.rounds.data[0].fixtures.data[0].lineup.data[0].stats);
    let stageId,
      rounds = [];
    result.data.stages.data.forEach(stage => {
      if (stage.name === 'Regular Season') {
        stageId = stage.id;
      }
    });
    result.data.rounds.data.forEach(round => {
      let roundInfo = {};
      if (round.stage_id === stageId && round.fixtures.data.length > 0) {
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
            awayClubScore: fixture.scores.visitorteam_score,
            status: fixture.time.status,
            lineup: []
          };
          fixture.lineup.data.forEach(player => {
            let playerInfo = {
              id: player.player_id,
              name: player.player_name,
              position: player.position,
              stats: {
                shots: {
                  shotsTotal: player.stats.shots.shots_total === null ? 0 : player.stats.shots.shots_total,
                  shotsOnGoal: player.stats.shots.shots_on_goal === null ? 0 : player.stats.shots.shots_on_goal
                },
                goals: {
                  scored: player.stats.goals.scored === null ? 0 : player.stats.goals.scored,
                  conceded: player.stats.goals.conceded === null ? 0 : player.stats.goals.conceded
                },
                fouls: {
                  drawn: player.stats.fouls.drawn === null ? 0 : player.stats.fouls.drawn,
                  committed: player.stats.fouls.committed === null ? 0 : player.stats.fouls.committed
                },
                cards: {
                  yellowCards: player.stats.cards.yellowCards === null ? 0 : player.stats.cards.yellowCards,
                  redCards: player.stats.cards.redCards === null ? 0 : player.stats.cards.redCards
                },
                passing: {
                  // the two accuracy stats here return numbers, but are to be treated as percentages
                  totalCrosses: player.stats.passing.total_crosses === null ? 0 : player.stats.passing.total_crosses,
                  crossesAccuracy: player.stats.passing.crosses_accuracy === null ? 0 : player.stats.passing.crosses_accuracy,
                  passes: player.stats.passing.passes === null ? 0 : player.stats.passing.passes,
                  passingAccuracy: player.stats.passing.passes_accuracy === null ? 0 : player.stats.passing.passes_accuracy
                },
                other: {
                  assists: player.stats.other.assists === null ? 0 : player.stats.other.assists,
                  offsides: player.stats.other.offsides === null ? 0 : player.stats.other.offsides,
                  saves: player.stats.other.saves === null ? 0 : player.stats.other.saves,
                  penaltiesScored: player.stats.other.pen_scored === null ? 0 : player.stats.other.pen_scored,
                  penaltiesMissed: player.stats.other.pen_missed === null ? 0 : player.stats.other.pen_missed,
                  penaltiesSaved: player.stats.other.pen_saved === null ? 0 : player.stats.other.pen_saved,
                  tackles: player.stats.other.tackles === null ? 0 : player.stats.other.tackles,
                  blocks: player.stats.other.blocks === null ? 0 : player.stats.other.blocks,
                  interceptions: player.stats.other.interceptions === null ? 0 : player.stats.other.interceptions,
                  clearances: player.stats.other.clearances === null ? 0 : player.stats.other.clearances,
                  minutesPlayed: player.stats.other.minutes_played === null ? 0 : player.stats.other.minutes_played
                }
              },
              fantasyPoints: 2,  // player earns 2 points just for being in lineup (aka starting the match)
              // fantasy points calculated below
              
            };
            fixtureInfo.lineup.push(playerInfo);
          });
          roundInfo.fixtures.push(fixtureInfo);
        });
        rounds.push(roundInfo);
      }
    });
    console.log(rounds[0].fixtures[0].lineup[0]);
  })
  .catch(error => {
    console.log(`playersStatsByLeagueSeason error: ${error}`);
  });
}

// playersStatsByLeagueSeason(914);

// function playerByIdBySeason(playerId, seasonId) {
//   const endpoint = `${baseURL}/players/`,
//     included = `${toInclude}stats,position,team`,
//     playerInfo = {
//       uri: `${endpoint}${playerId}${key}${included}`,
//       json: true
//     };
  
//   return rp(playerInfo)
//   .then(playerInfo => {
//     // console.log(playerInfo.data.stats.data);
//     let player = {};
//     playerInfo.data.stats.data.forEach(stat => {
//       if (stat.season_id === seasonId) {
//         // console.log(stat);
//         player = {
//           playerCommonName: playerInfo.data.common_name,
//           playerFirstName: playerInfo.data.firstname,
//           playerLastName: playerInfo.data.lastname,
//           playerPictureLink: playerInfo.data.image_path,
//           playerIdFromAPI: playerInfo.data.player_id,
//           playerClubIdFromAPI: playerInfo.data.team.data.id,
//           playerClub: playerInfo.data.team.data.name,
//           playerClubLogo: playerInfo.data.team.data.logo_path,
//           playerPositionId: playerInfo.data.position.data.id,
//           playerPosition: playerInfo.data.position.data.name,
//   				playerStats: {
//   				  gamesPlayed: stat.appearences,
//   				  gamesStarted: stat.lineups,
//   					minutesPlayed: 0,
//   	        goalsScored: 0,
//   	        goalsConceded: 0,
//   	        assists: 0,
//   	    		shotsTaken: 0,
//   	    		shotsOnGoal: 0,
//   	    		foulsDrawn: 0,
//   	    		foulsCommitted: 0,
//   	    		yellowCards: 0,
//   	    		yellowRedCards: 0,
//   	    		redCards: 0,
//   	    		passes: 0,
//   	    		passingAccuracy: 0,
//   	    		crosses: 0,
//   	    		crossingAccuracy: 0,
//   	    		timesOffside: 0,
//   	    		saves: 0,
//   	    		penaltiesScored: 0,
//   	    		penaltiesMissed: 0,
//   	    		tackles: 0,
//   	    		blocks: 0,
//   	    		interceptions: 0,
//   	    		clearances: 0
//   				},
//   				playerValue: 0, // in millions of $$$'s
//   				playerSchedule: [],
//   				playerFantasyPointsWeek: 0,
//           playerFantasyPointsTotal: 0
//         };
//       }
//     });
//     // console.log(player);
//     return player;
//   })
//   .catch(error => {
//     console.log(`playerByIdBySeason error: ${error}`);
//   });
// }

// playerByIdBySeason(918, 914);

exports.leagueSelector = leagueSelector;
exports.seasonByLeague = seasonByLeague;
exports.playersStatsByLeagueSeason = playersStatsByLeagueSeason;
// exports.playerByIdBySeason = playerByIdBySeason;