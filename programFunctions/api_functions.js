const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=';

//this function is to get a list of leagues available to the player
function leagueGrabber() {
  const endpoint = `${baseURL}/leagues`,
    leagues = {
      uri: `${endpoint}${key}`,
      json: true
    };
  
  return rp(leagues)
  .then(leagues => {
    console.log(leagues);
    return leagues;
  });
}

// leagueGrabber();

//this function is to get the current season or most recent season of a league
function playersByLeagueGrabber(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    included = `${toInclude}season,seasons`,
    league = {
      uri: `${endpoint}${leagueId}${key}${included}`,
      json: true
    };
  
  return rp(league)
  .then(league => {
    console.log(league);
    // console.log(league.data.seasons.data[0].id);
    return league.data.seasons.data[0].id;
  })
  // .then(seasonId => {
  //   const endpoint = `${baseURL}/teams/season/`,
  //     included = `${toInclude}squad,stats,transfers`,
  //     teams = {
  //       uri: `${endpoint}${seasonId}${key}${included}`,
  //       json: true
  //     };
    
  //   return rp(teams)
  //   .then(teams => {
  //     // writing another function to retrieve players until i can get access to an active league
  //     // will come back to this once i can, but i need to get to working on players
  //     // console.log(teams.data[0].squad.data);
  //     return teams.data[0].squad.data;
  //   })
  //   .catch(error => {
  //     console.log(`error from teams in seasonGrabber: ${error}`);
  //   });
  // })
  .catch(error => {
    console.log(`playersByLeagueGrabber error: ${error}`);
  });
}

// playersByLeagueGrabber(779);

exports.leagueGrabber = leagueGrabber;
exports.playersByLeagueGrabber = playersByLeagueGrabber;