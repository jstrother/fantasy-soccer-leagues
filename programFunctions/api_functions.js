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
  });
}

//this function is to get the current season or most recent season of a league
function seasonGrabber(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    included = `${toInclude}seasons,season`,
    league = {
      uri: `${endpoint}${leagueId}${key}${included}`,
      json: true
    };
  
  return rp(league)
  .then(league => {
    return league.data.season;
  })
  .then((season) => {
    // console.log(season);
    return season;
  })
  .catch(error => {
    console.log(`leagueGrabber error: ${error}`);
  });
}

leagueGrabber();

exports.leagueGrabber = leagueGrabber;
exports.seasonGrabber = seasonGrabber;