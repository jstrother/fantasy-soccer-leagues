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

// this function is to fetch league info by id
function playersByLeague(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    league = {
      uri: `${endpoint}${leagueId}${key}`,
      json: true
    };
    
  return rp(league)
  .then(league => {
    return league.data.current_season_id;
  })
  .then(seasonId => {
    const endpoint = `${baseURL}/teams/season/`,
      included = `${toInclude}squad`,
      teams = {
        uri: `${endpoint}${seasonId}${key}${included}`,
        json: true
      };
      
    return rp(teams)
    .then(teams => {
      let squads = [];
      for (let i = 0; i < teams.data.length; i++) {
        squads.push(teams.data[i].squad.data);
      }
      return squads;
    })
    .then(squads => {
      let players = [];
      for (let i = 0; i < squads.length; i++) {
        for (let j = 0; j < squads[i].length; j++) {
          let playerId = squads[i][j].player_id;
          const endpoint = `${baseURL}/players/`,
            included = `${toInclude}stats,team`,
            player = {
              uri: `${endpoint}${playerId}${key}${included}`,
              json: true
            };
          // console.log(playerId);
          rp(player)
          .then(player => {
            console.log(player);
            // players.push(player);
          })
          .catch(error => {
            console.log(`squads double for-loop error: ${error}`);
          });
        }
      }
      // console.log(`players list: ${players}`);
      return players;
    })
    .catch(error => {
      console.log(`playerByLeague teams error: ${error}`);
    });
  })
  .catch(error => {
    console.log(`playerByLeague error: ${error}`);
  });
}

playersByLeague(779);

exports.playersByLeague = playersByLeague;
exports.allLeagues = allLeagues;