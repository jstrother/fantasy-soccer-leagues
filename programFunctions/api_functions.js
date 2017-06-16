const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=';

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

// this function is to retrieve matches in a league's season [returns array]
// match and fixture are interchangeable
function matchesByLeagueSeason(seasonId) {
  const endpoint = `${baseURL}/seasons/`,
    included = `${toInclude}fixtures`, // fixture must be left here as it is a part of the api json return
    matches = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(matches)
  .then(matches => {
    let matchIdList = [];
    matches.data.fixtures.data.forEach(fixture => { // fixtures must be left here as it is a part of the api json return
      matchIdList.push(fixture.id);
    });
    console.log(matchIdList);
    return matchIdList;
  })
  .catch(error => {
    console.log(`matchesByLeagueSeason error: ${error}`);
  });
}

// matchesByLeagueSeason(914);

// this function retrieves information about a particular match by its ID
function playerStatsByMatch(matchId) {
  const endpoint = `${baseURL}/fixtures/`, // fixture must be left here as it is a part of the api json return
    included = `${toInclude}substitutions,lineup,localTeam,visitorTeam`,
    match = {
      uri: `${endpoint}${matchId}${key}${included}`,
      json: true
    };
  
  return rp(match)
  .then(match => {
    let lineup = match.data.lineup.data,
      substitutions = match.data.substitutions.data,
      homeClub = match.data.localTeam.data,
      awayClub = match.data.visitorTeam.data,
      matchData = {
        lineup,
        substitutions,
        homeClub,
        awayClub
      };
    // console.log(matchData.homeClub);
    return matchData;
  })
  .catch(error => {
    console.log(`playerStatsByMatch error: ${error}`);
  });
}

// playerStatsByMatch(237282);

function teamPlayerIdsBySeason(seasonId) {
  const endpoint = `${baseURL}/teams/season/`,
    included = `${toInclude}squad`,
    teams = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(teams)
  .then(teams => {
    let playerIdList = [];
    teams.data.forEach(team => {
      if(team.squad.data.length > 0) {
        team.squad.data.forEach(player => {
          playerIdList.push(player.player_id);
        });
      }
    });
    return playerIdList;
  })
  .catch(error => {
    console.log(`teamPlayerIdsBySeason error: ${error}`);
  });
}

// teamPlayerIdsBySeason(914);

function playerByIdBySeason(playerId, seasonId) {
  const endpoint = `${baseURL}/players/`,
    included = `${toInclude}stats,position,team`,
    playerInfo = {
      uri: `${endpoint}${playerId}${key}${included}`,
      json: true
    };
  
  return rp(playerInfo)
  .then(playerInfo => {
    // console.log(playerInfo.data.team.data);
    let player = {};
    playerInfo.data.stats.data.forEach(stat => {
      if (stat.season_id === seasonId) {
        player = {
          playerCommonName: playerInfo.data.common_name,
          playerFirstName: playerInfo.data.firstname,
          playerLastName: playerInfo.data.lastname,
          playerPictureLink: playerInfo.data.image_path,
          playerIdFromAPI: playerInfo.data.player_id,
          playerClubIdFromAPI: playerInfo.data.team.data.id,
          playerClub: playerInfo.data.team.data.name,
          playerPositionId: playerInfo.data.position.data.id,
          playerPosition: playerInfo.data.position.data.name,
  				playerStats: {
  				  gamesPlayed: stat.appearences,
  					minutesPlayed: null,
  	        goalsScored: null,
  	        goalsConceded: null,
  	        assists: null,
  	    		shotsTaken: null,
  	    		shotsOnGoal: null,
  	    		foulsDrawn: null,
  	    		foulsCommitted: null,
  	    		yellowCards: null,
  	    		yellowRedCards: null,
  	    		redCards: null,
  	    		passes: null,
  	    		passingAccuracy: null,
  	    		crosses: null,
  	    		crossingAccuracy: null,
  	    		timesOffside: null,
  	    		saves: null,
  	    		penaltiesScored: null,
  	    		penaltiesMissed: null,
  	    		tackles: null,
  	    		blocks: null,
  	    		interceptions: null,
  	    		clearances: null
  				},
  				playerValue: null, // in millions of $$$'s
  				playerSchedule: null,
  				playerFantasyPointsWeek: null,
          playerFantasyPointsTotal: null
        };
      }
    });
    // console.log(player);
    return player;
  })
  .catch(error => {
    console.log(`playerById error: ${error}`);
  });
}

// playerByIdBySeason(918, 914);

exports.seasonByLeague = seasonByLeague;
exports.matchesByLeagueSeason = matchesByLeagueSeason;
exports.playerStatsByMatch = playerStatsByMatch;
exports.playerByIdBySeason = playerByIdBySeason;
exports.teamPlayerIdsBySeason = teamPlayerIdsBySeason;