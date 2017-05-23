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
    console.log(`competitionGrabber error: ${error}`);
  });
}

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
    console.log(`seasonGrabber error: ${error}`);
  });
}

function teamsGrabber(seasonId) {
  const endpoint = `${baseURL}/teams/season/`,
    included = `${toInclude}players`,
    teams = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(teams)
  .then(teams => {
    console.log(teams);
    return teams;
  })
  .catch(error => {
    console.log(`teamsGrabber error: ${error}`);
  });
}

// teamsGrabber(741);

function playersGrabber(playerId) {
  const endpoint = `${baseURL}/players/`,
    included = `${toInclude}team,events,lineups,position`,
    player = {
        uri: `${endpoint}${playerId}${key}${included}`,
        json: true
    };
  
  return rp(player)
  .then(player => {
    return player;
  })
  .catch(error => {
    console.log(`playersGrabber error: ${error}`);
  });
}

function playersByTeamGrabber(teamId) {
  const endpoint = `${baseURL}/players/team/`,
    included = `${toInclude}team,events,season,lineups,position`,
    player = {
        uri: `${endpoint}${teamId}${key}${included}`,
        json: true
    };
  
  return rp(player)
  .then(player => {
    console.log(player);
    return player;
  })
  .catch(error => {
    console.log(`playersGrabber error: ${error}`);
  });
}

playersByTeamGrabber(690);

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
    console.log(`matchGrabber error: ${error}`);
  });
}

function matchStatsGrabber(matchId) {
  const endpoint = `${baseURL}/statistics/match/`,
    included = `${toInclude}team`,
    matchStats = {
      uri: `${endpoint}${matchId}${key}${included}`,
      json: true
    };
  
  return rp(matchStats)
  .then(matchStats => {
    return matchStats;
  })
  .catch(error => {
    console.log(`matchStatsGrabber error: ${error}`);
  });
}

exports.competitionGrabber = competitionGrabber;
exports.seasonGrabber = seasonGrabber;
exports.teamsGrabber = teamsGrabber;
exports.playersGrabber = playersGrabber;
exports.matchGrabber = matchGrabber;
exports.matchStatsGrabber = matchStatsGrabber;
exports.playersByTeamGrabber = playersByTeamGrabber;