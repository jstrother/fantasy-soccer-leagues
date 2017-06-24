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

// this function returns the current season in a particular league
function seasonByLeague(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    league = {
      uri: `${endpoint}${leagueId}${key}`,
      json: true
    };
    
  return rp(league)
  .then(league => {
    return league.data.current_season_id;
  })
  .catch(error => {
    console.log(`seasonByLeague error: ${error}`);
  });
}

// seasonByLeague(779);

// retrieves player stats for each match in league season
// match and fixture are interchangeable
function playersStatsByLeagueSeason(seasonId) {
  const endpoint = `${baseURL}/seasons/`,
    included = `${toInclude}fixtures.lineup,fixtures.substitutions,fixtures.goals,fixtures.cards,fixtures.other,fixtures.localTeam,fixtures.visitorTeam`, // fixture must be left here as it is a part of the api json return
    result = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(result)
  .then(result => {
    // console.log(result.data.fixtures.data[0].lineup.data[5]);
    let playerData = {},
      homeClub = {},
      awayClub = {};
    result.data.fixtures.data.forEach(fixture => {
      homeClub.clubIdFromApi = fixture.localTeam.data.id;
      homeClub.clubName = fixture.localTeam.data.name;
      homeClub.clubLogo = fixture.localTeam.data.logo_path;
      
      awayClub.clubIdFromApi = fixture.visitorTeam.data.id;
      awayClub.clubName = fixture.visitorTeam.data.name;
      awayClub.clubLogo = fixture.visitorTeam.data.logo_path;
      
      fixture.lineup.data.forEach(lineupMember => {
        return playerByIdBySeason(lineupMember.player_id, seasonId)
        .then(player => {
          playerData.playerCommonName = lineupMember.data.common_name;
          playerData.playerClubName = homeClub.clubName;
          console.log(playerData);
        });
      });
    });
  })
  .catch(error => {
    console.log(`matchesByLeagueSeason error: ${error}`);
  });
}

playersStatsByLeagueSeason(914);

function playerByIdBySeason(playerId, seasonId) {
  const endpoint = `${baseURL}/players/`,
    included = `${toInclude}stats,position,team`,
    playerInfo = {
      uri: `${endpoint}${playerId}${key}${included}`,
      json: true
    };
  
  return rp(playerInfo)
  .then(playerInfo => {
    // console.log(playerInfo.data.stats.data);
    let player = {};
    playerInfo.data.stats.data.forEach(stat => {
      if (stat.season_id === seasonId) {
        // console.log(stat);
        player = {
          playerCommonName: playerInfo.data.common_name,
          playerFirstName: playerInfo.data.firstname,
          playerLastName: playerInfo.data.lastname,
          playerPictureLink: playerInfo.data.image_path,
          playerIdFromAPI: playerInfo.data.player_id,
          playerClubIdFromAPI: playerInfo.data.team.data.id,
          playerClub: playerInfo.data.team.data.name,
          playerClubLogo: playerInfo.data.team.data.logo_path,
          playerPositionId: playerInfo.data.position.data.id,
          playerPosition: playerInfo.data.position.data.name,
  				playerStats: {
  				  gamesPlayed: stat.appearences,
  				  gamesStarted: stat.lineups,
  					minutesPlayed: 0,
  	        goalsScored: 0,
  	        goalsConceded: 0,
  	        assists: 0,
  	    		shotsTaken: 0,
  	    		shotsOnGoal: 0,
  	    		foulsDrawn: 0,
  	    		foulsCommitted: 0,
  	    		yellowCards: 0,
  	    		yellowRedCards: 0,
  	    		redCards: 0,
  	    		passes: 0,
  	    		passingAccuracy: 0,
  	    		crosses: 0,
  	    		crossingAccuracy: 0,
  	    		timesOffside: 0,
  	    		saves: 0,
  	    		penaltiesScored: 0,
  	    		penaltiesMissed: 0,
  	    		tackles: 0,
  	    		blocks: 0,
  	    		interceptions: 0,
  	    		clearances: 0
  				},
  				playerValue: 0, // in millions of $$$'s
  				playerSchedule: [],
  				playerFantasyPointsWeek: 0,
          playerFantasyPointsTotal: 0
        };
      }
    });
    // console.log(player);
    return player;
  })
  .catch(error => {
    console.log(`playerByIdBySeason error: ${error}`);
  });
}

// playerByIdBySeason(918, 914);

exports.leagueSelector = leagueSelector;
exports.seasonByLeague = seasonByLeague;
exports.playersStatsByLeagueSeason = playersStatsByLeagueSeason;
exports.playerByIdBySeason = playerByIdBySeason;