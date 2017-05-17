// api-interaction functions for fantasydata.com

const rp = require('request-promise'),
    key = require('./config.js').API_KEY;

function scheduleGrabber(roundId) {
  let options = {
    uri: `https://api.fantasydata.net/soccer/v2/json/Schedule/${roundId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': key
    },
    json: true
  };
  
  return rp(options)
  .then((options) => {
    console.log(`options: ${options}`);
    let gameId = options.GameId,
		  dateTime = options.DateTime,
		  status = options.Status,
		  winner = options.Winner,
		  awayTeamName = options.AwayTeamName,
		  awayTeamScore = options.AwayTeamScore,
		  homeTeamName = options.HomeTeamName,
		  homeTeamScore = options.HomeTeamScore;
		// loop through all objects in resulting array
		console.log ({
		  gameId,
		  dateTime,
		  status,
		  winner,
		  awayTeamName,
		  awayTeamScore,
		  homeTeamName,
		  homeTeamScore
		});
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

scheduleGrabber(117);

function playerGameStatsGrabber(date, playerId) {
  let options = {
    uri: `https://api.fantasydata.net/soccer/v2/json/PlayerGameStatsByPlayer/${date}/${playerId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': key
    },
    json: true
  };
  
  return rp(options)
  .then(() => {
    
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

function playerSeasonStatsGrabber(roundId, playerId) {
  let options = {
    uri: `https://api.fantasydata.net/soccer/v2/{format}/PlayerSeasonStatsByPlayer/${roundId}/${playerId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': key
    },
    json: true
  };
  
  return rp(options)
  .then(() => {
    
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

function competitionFixturesGrabber(competitionId) {
  let options = {
    uri: `https://api.fantasydata.net/soccer/v2/json/CompetitionDetails/${competitionId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': key
    },
    json: true
  };
  
  return rp(options)
  .then(() => {
    
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

exports.scheduleGrabber = scheduleGrabber;
exports.playerGameStatsGrabber = playerGameStatsGrabber;
exports.playerSeasonStatsGrabber = playerSeasonStatsGrabber;
exports.competitionFixturesGrabber = competitionFixturesGrabber;