const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://api.soccerama.pro/v1.2',
    toInclude = '&include=';

function competitionGrabber(competitionId) {
  const endpoint = `${baseURL}/competitions/`,
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
  const endpoint = `${baseURL}/seasons/`,
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
  const endpoint = `${baseURL}/teams/season/`,
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
  const endpoint1 = `${baseURL}/players/team/`,
    endpoint2 = '/season/',
    included = `${toInclude}players`,
    roster = {
      uri: `${endpoint1}${teamId}${endpoint2}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(roster)
  .then(roster => {
    return roster;
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

// rosterGrabber(152, 741);

function playersGrabber(playerId) {
  const endpoint = `${baseURL}/players/`,
    included = `${toInclude}team`,
    player = {
        uri: `${endpoint}${playerId}${key}${included}`,
        json: true
    };
  
  return rp(player)
  .then(player => {
    return player;
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

// playersGrabber(217);

function matchGrabber(matchId) {
  const endpoint = `${baseURL}/matches/`,
    included = `${toInclude}competition,season,homeTeam,awayTeam,events,lineup`,
    match = {
      uri: `${endpoint}${matchId}${key}${included}`,
      json: true
    };
  
  return rp(match)
  .then(match => {
    return match;
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

// matchGrabber(687992);

function matchStatsGrabber(matchId) {
  const endpoint = `${baseURL}/statistics/match/`,
    included = `${toInclude}team`,
    matchStats = {
      uri: `${endpoint}${matchId}${key}${included}`,
      json: true
    };
  
  return rp(matchStats)
  .then(matchStats => {
    console.log(matchStats);
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

// matchStatsGrabber(687993);

exports.competitionGrabber = competitionGrabber;
exports.seasonGrabber = seasonGrabber;
exports.teamsGrabber = teamsGrabber;
exports.rosterGrabber = rosterGrabber;
exports.playersGrabber = playersGrabber;
exports.matchGrabber = matchGrabber;
exports.matchStatsGrabber = matchStatsGrabber;