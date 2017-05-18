// api-interaction functions for fantasydata.com

const rp = require('request-promise'),
    key = require('./config.js').API_KEY;

function scheduleGrabber(roundId) {
  let schedule = {
    uri: `https://api.fantasydata.net/soccer/v2/json/Schedule/${roundId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': key
    },
    json: true
  };
  
  return rp(schedule)
  .then((schedule) => {
    let gameId = schedule[0].GameId,
		  dateTime = schedule[0].DateTime,
		  status = schedule[0].Status,
		  winner = schedule[0].Winner,
		  awayTeamId = schedule[0].awayTeamId,
		  awayTeamName = schedule[0].AwayTeamName,
		  awayTeamScore = schedule[0].AwayTeamScore,
		  homeTeamId = schedule[0].homeTeamId,
		  homeTeamName = schedule[0].HomeTeamName,
		  homeTeamScore = schedule[0].HomeTeamScore;
		// loop through all objects in resulting array
		console.log ({
		  gameId,
		  dateTime,
		  status,
		  winner,
		  awayTeamId,
		  awayTeamName,
		  awayTeamScore,
		  homeTeamId,
		  homeTeamName,
		  homeTeamScore
		});
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

// scheduleGrabber(117);

function playerGameStatsGrabber(date, playerId) {
  let playerGameStats = {
    uri: `https://api.fantasydata.net/soccer/v2/json/PlayerGameStatsByPlayer/${date}/${playerId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': key
    },
    json: true
  };
  
  return rp(playerGameStats)
  .then((playerGameStats) => {
    let name = playerGameStats.Name,
			shortName = playerGameStats.ShortName,
			team = playerGameStats.Team,
			teamId = playerGameStats.TeamId,
			suspension = playerGameStats.Suspension,
			suspensionReason = playerGameStats.SuspensionReason,
			injuryStatus = playerGameStats.InjuryStatus,
			injuryBodyPart = playerGameStats.InjuryBodyPart,
			injuryNotes = playerGameStats.InjuryNotes,
			injuryStartDate = playerGameStats.InjuryStartDate,
			fantasyPoints = playerGameStats.FantasyPoints,
			position = playerGameStats.Position,
			minutes = playerGameStats.Minutes,
			goals = playerGameStats.Goals, // required for fantasy points calculations
			assists = playerGameStats.Assists, // required for fantasy points calculations
			shots = playerGameStats.Shots, // required for fantasy points calculations
			shotsOnGoal = playerGameStats.ShotsOnGoal, // required for fantasy points calculations
			yellowCards = playerGameStats.YellowCards, // required for fantasy points calculations
			redCards = playerGameStats.RedCards, // required for fantasy points calculations
			yellowRedCards = playerGameStats.YellowRedCards,
			crosses = playerGameStats.Crosses, // required for fantasy points calculations
			tacklesWon = playerGameStats.TacklesWon, // required for fantasy points calculations
			interceptions = playerGameStats.Interceptions, // required for fantasy points calculations
			ownGoals = playerGameStats.OwnGoals,
			fouls = playerGameStats.Fouls, // required for fantasy points calculations
			fouled = playerGameStats.Fouled, // required for fantasy points calculations
			offsides = playerGameStats.Offsides,
			passes = playerGameStats.Passes,
			passesCompleted = playerGameStats.PassesCompleted,
			defenderCleanSheets = playerGameStats.DefenderCleanSheets, //defenders only; required for fantasy points calculations
			gkSaves = playerGameStats.GoalkeeperSaves, //goalkeepers only; required for fantasy points calculations
			gkGoalsAgainst = playerGameStats.GoalkeeperGoalsAgainst, //goalkeepers only; required for fantasy points calculations
			gkCleanSheets = playerGameStats.GoalkeeperCleanSheets, //goalkeepers only; required for fantasy points calculations
			gkWins = playerGameStats.GoalkeeperWins, //goalkeepers only; required for fantasy points calculations
			pkGoals = playerGameStats.PenaltyKickGoals,
			pkMisses = playerGameStats.PenaltyKickMisses, // required for fantasy points calculations
			pkSaves = playerGameStats.PenaltyKickSaves; //goalkeepers only; required for fantasy points calculations
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

function playerSeasonStatsGrabber(roundId, playerId) {
  let playerSeasonStats = {
    uri: `https://api.fantasydata.net/soccer/v2/{format}/PlayerSeasonStatsByPlayer/${roundId}/${playerId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': key
    },
    json: true
  };
  
  return rp(playerSeasonStats)
  .then(() => {
    
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

function competitionFixturesGrabber(competitionId) {
  let competition = {
    uri: `https://api.fantasydata.net/soccer/v2/json/CompetitionDetails/${competitionId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': key
    },
    json: true
  };
  
  return rp(competition)
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