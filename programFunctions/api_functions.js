const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=';

function leagueGrabber(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    included = `${toInclude}seasons,season`,
    competition = {
      uri: `${endpoint}${leagueId}${key}${included}`,
      json: true
    };
  
  return rp(competition)
  .then(competition => {
    console.log(competition);
    return competition;
  })
  .catch(error => {
    console.log(`leagueGrabber error: ${error}`);
  });
}

leagueGrabber(501);

exports.leagueGrabber = leagueGrabber;