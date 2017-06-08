const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=';

//this function is to get a list of leagues available to the player
function allLeagues() {
  const endpoint = `${baseURL}/leagues`,
    leagues = {
      uri: `${endpoint}${key}`,
      json: true
    };
  
  return rp(leagues)
  .then(leagues => {
    // console.log(leagues);
    return leagues;
  })
  .catch(error => {
    console.log(`allLeagues error: ${error}`);
  });
}

// allLeagues();

// this function returns the 
function seasonByLeague(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    league = {
      uri: `${endpoint}${leagueId}${key}`,
      json: true
    };
    
  return rp(league)
  .then(league => {
    // console.log(`seasonId: ${league.data.current_season_id}`);
    return league.data.current_season_id;
  })
  .catch(error => {
    console.log(`seasonByLeague error: ${error}`);
  });
}

// seasonByLeague(779);

// this function is to retrieve all players in particular season
function playersBySeason(seasonId) {
  const endpoint = `${baseURL}/teams/season/`,
    included = `${toInclude}squad`,
    teams = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
    
  return rp(teams)
  .then(teams => {
    let playerList = [];
    for (let i = 0; i < teams.data.length; i++) {
      for (let j = 0; j < teams.data[i].squad.data.length; j++) {
        playerList.push(teams.data[i].squad.data[j].player_id);
      }
    }
    // console.log('playerList:', playerList);
    return playerList;
  })
  .catch(error => {
    console.log(`playersBySeason error: ${error}`);
  });
}

// playersBySeason(914);

// this function is to retrieve player stats
function playerStatsBySeason(playerId, seasonId) {
  const endpoint = `${baseURL}/players/`,
    included = `${toInclude}stats,team`,
    player = {
      uri: `${endpoint}${playerId}${key}${included}`,
      json: true
    };
  
  rp(player)
  .then(player => {
    let playerSeasonStats =[];
    for (let i = 0; i < player.data.stats.data.length; i++) {
      if (player.data.stats.data[i].season_id === seasonId) {
        playerSeasonStats.push(player.data.stats.data[i]);
      }
    }
    console.log('player:', playerSeasonStats);
    return playerSeasonStats;
  })
  .catch(error => {
    console.log(`playerStats error: ${error}`);
  });
}

// playerStatsBySeason(918, 914);

exports.allLeagues = allLeagues;
exports.seasonByLeague = seasonByLeague;
exports.playersBySeason = playersBySeason;
exports.playerStatsBySeason = playerStatsBySeason;