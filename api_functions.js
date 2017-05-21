const rp = require('request-promise'),
    key = require('./config.js').API_KEY,
    baseURL = 'https://api.soccerama.pro/v1.2',
    toInclude = '&include=';

function competitionGrabber(competitionId) {
  let endpoint = `${baseURL}/competitions/`,
    included = `${toInclude}currentSeason`,
    competition = {
      uri: `${endpoint}${competitionId}${key}${included}`,
      json: true
  };
  
  return rp(competition)
  .then(competition => {
    return competition;
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

// competitionGrabber(66);

function seasonGrabber(seasonId) {
  let endpoint = `${baseURL}/seasons/`,
    included = `${toInclude}matches`,
    season = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(season)
  .then(season => {
    return season;
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

// seasonGrabber(741);

function teamsGrabber(seasonId) {
  let endpoint = `${baseURL}/teams/season/`,
    included = `${toInclude}players`,
    teams = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(teams)
  .then(teams => {
    return teams;
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

// teamsGrabber(741);

function rosterGrabber(teamId, seasonId) {
  let endpoint1 = `${baseURL}/players/team/`,
    endpoint2 = '/season/',
    included = `${toInclude}players`,
    roster = {
      uri: `${endpoint1}${teamId}${endpoint2}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(roster)
  .then(roster => {
    console.log(roster.players.data[0]);
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

// rosterGrabber(152, 741);

exports.competitionGrabber = competitionGrabber;
exports.seasonGrabber = seasonGrabber;
exports.teamsGrabber = teamsGrabber;
exports.rosterGrabber = rosterGrabber;