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
		  dateTime = schedule[0].DateTime.split('T', 1)[0],
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
    console.log(`playerGameStats: ${playerGameStats}`);
    let name = playerGameStats[0].Name,
			shortName = playerGameStats[0].ShortName,
			team = playerGameStats[0].Team,
			teamId = playerGameStats[0].TeamId,
			suspension = playerGameStats[0].Suspension,
			suspensionReason = playerGameStats[0].SuspensionReason,
			injuryStatus = playerGameStats[0].InjuryStatus,
			injuryBodyPart = playerGameStats[0].InjuryBodyPart,
			injuryNotes = playerGameStats[0].InjuryNotes,
			injuryStartDate = playerGameStats[0].InjuryStartDate,
			fantasyPoints = playerGameStats[0].FantasyPoints,
			position = playerGameStats[0].Position,
			minutes = playerGameStats[0].Minutes,
			goals = playerGameStats[0].Goals, // required for fantasy points calculations
			assists = playerGameStats[0].Assists, // required for fantasy points calculations
			shots = playerGameStats[0].Shots, // required for fantasy points calculations
			shotsOnGoal = playerGameStats[0].ShotsOnGoal, // required for fantasy points calculations
			yellowCards = playerGameStats[0].YellowCards, // required for fantasy points calculations
			redCards = playerGameStats[0].RedCards, // required for fantasy points calculations
			yellowRedCards = playerGameStats[0].YellowRedCards,
			crosses = playerGameStats[0].Crosses, // required for fantasy points calculations
			tacklesWon = playerGameStats[0].TacklesWon, // required for fantasy points calculations
			interceptions = playerGameStats[0].Interceptions, // required for fantasy points calculations
			ownGoals = playerGameStats[0].OwnGoals,
			fouls = playerGameStats[0].Fouls, // required for fantasy points calculations
			fouled = playerGameStats[0].Fouled, // required for fantasy points calculations
			offsides = playerGameStats[0].Offsides,
			passes = playerGameStats[0].Passes,
			passesCompleted = playerGameStats[0].PassesCompleted,
			defenderCleanSheets = playerGameStats[0].DefenderCleanSheets, //defenders only; required for fantasy points calculations
			gkSaves = playerGameStats[0].GoalkeeperSaves, //goalkeepers only; required for fantasy points calculations
			gkGoalsAgainst = playerGameStats[0].GoalkeeperGoalsAgainst, //goalkeepers only; required for fantasy points calculations
			gkCleanSheets = playerGameStats[0].GoalkeeperCleanSheets, //goalkeepers only; required for fantasy points calculations
			gkWins = playerGameStats[0].GoalkeeperWins, //goalkeepers only; required for fantasy points calculations
			pkGoals = playerGameStats[0].PenaltyKickGoals,
			pkMisses = playerGameStats[0].PenaltyKickMisses, // required for fantasy points calculations
			pkSaves = playerGameStats[0].PenaltyKickSaves; //goalkeepers only; required for fantasy points calculations
			
			console.log({
			  name,
			  shortName,
			  team,
			  teamId,
			  suspension,
			  suspensionReason,
			  injuryStatus,
			  injuryBodyPart,
			  injuryNotes,
			  injuryStartDate,
			  fantasyPoints,
			  position,
			  minutes,
			  goals,
			  assists,
			  shots,
			  shotsOnGoal,
			  yellowCards,
			  redCards,
			  yellowRedCards,
			  crosses,
			  tacklesWon,
			  interceptions,
			  ownGoals,
			  fouls,
			  fouled,
			  offsides,
			  passes,
			  passesCompleted,
			  defenderCleanSheets,
			  gkSaves,
			  gkGoalsAgainst,
			  gkCleanSheets,
			  gkWins,
			  pkGoals,
			  pkMisses,
			  pkSaves
			});
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

function playerSeasonStatsGrabber(roundId, playerId) {
  let playerSeasonStats = {
    uri: `https://api.fantasydata.net/soccer/v2/json/PlayerSeasonStatsByPlayer/${roundId}/${playerId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': key
    },
    json: true
  };
  
  return rp(playerSeasonStats)
  .then((playerSeasonStats) => {
    console.log(`playerSeasonStats: ${playerSeasonStats}`);
    let name = playerSeasonStats[0].Name,
			shortName = playerSeasonStats[0].ShortName,
			team = playerSeasonStats[0].Team,
			teamId = playerSeasonStats[0].TeamId,
			suspension = playerSeasonStats[0].Suspension,
			suspensionReason = playerSeasonStats[0].SuspensionReason,
			injuryStatus = playerSeasonStats[0].InjuryStatus,
			injuryBodyPart = playerSeasonStats[0].InjuryBodyPart,
			injuryNotes = playerSeasonStats[0].InjuryNotes,
			injuryStartDate = playerSeasonStats[0].InjuryStartDate,
			fantasyPoints = playerSeasonStats[0].FantasyPoints,
			position = playerSeasonStats[0].Position,
			minutes = playerSeasonStats[0].Minutes,
			goals = playerSeasonStats[0].Goals, // required for fantasy points calculations
			assists = playerSeasonStats[0].Assists, // required for fantasy points calculations
			shots = playerSeasonStats[0].Shots, // required for fantasy points calculations
			shotsOnGoal = playerSeasonStats[0].ShotsOnGoal, // required for fantasy points calculations
			yellowCards = playerSeasonStats[0].YellowCards, // required for fantasy points calculations
			redCards = playerSeasonStats[0].RedCards, // required for fantasy points calculations
			yellowRedCards = playerSeasonStats[0].YellowRedCards,
			crosses = playerSeasonStats[0].Crosses, // required for fantasy points calculations
			tacklesWon = playerSeasonStats[0].TacklesWon, // required for fantasy points calculations
			interceptions = playerSeasonStats[0].Interceptions, // required for fantasy points calculations
			ownGoals = playerSeasonStats[0].OwnGoals,
			fouls = playerSeasonStats[0].Fouls, // required for fantasy points calculations
			fouled = playerSeasonStats[0].Fouled, // required for fantasy points calculations
			offsides = playerSeasonStats[0].Offsides,
			passes = playerSeasonStats[0].Passes,
			passesCompleted = playerSeasonStats[0].PassesCompleted,
			defenderCleanSheets = playerSeasonStats[0].DefenderCleanSheets, //defenders only; required for fantasy points calculations
			gkSaves = playerSeasonStats[0].GoalkeeperSaves, //goalkeepers only; required for fantasy points calculations
			gkGoalsAgainst = playerSeasonStats[0].GoalkeeperGoalsAgainst, //goalkeepers only; required for fantasy points calculations
			gkCleanSheets = playerSeasonStats[0].GoalkeeperCleanSheets, //goalkeepers only; required for fantasy points calculations
			gkWins = playerSeasonStats[0].GoalkeeperWins, //goalkeepers only; required for fantasy points calculations
			pkGoals = playerSeasonStats[0].PenaltyKickGoals,
			pkMisses = playerSeasonStats[0].PenaltyKickMisses, // required for fantasy points calculations
			pkSaves = playerSeasonStats[0].PenaltyKickSaves; //goalkeepers only; required for fantasy points calculations
			
			console.log({
			  name,
			  shortName,
			  team,
			  teamId,
			  suspension,
			  suspensionReason,
			  injuryStatus,
			  injuryBodyPart,
			  injuryNotes,
			  injuryStartDate,
			  fantasyPoints,
			  position,
			  minutes,
			  goals,
			  assists,
			  shots,
			  shotsOnGoal,
			  yellowCards,
			  redCards,
			  yellowRedCards,
			  crosses,
			  tacklesWon,
			  interceptions,
			  ownGoals,
			  fouls,
			  fouled,
			  offsides,
			  passes,
			  passesCompleted,
			  defenderCleanSheets,
			  gkSaves,
			  gkGoalsAgainst,
			  gkCleanSheets,
			  gkWins,
			  pkGoals,
			  pkMisses,
			  pkSaves
			});
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
  .then((competition) => {
    let roundId,
      leaguePlayers = [];
    if (competition.CurrentSeason.CurrentSeason === true) {
      console.log(`${competition.Name} is active`);
      if (competition.CurrentSeason.Rounds[0].CurrentRound === true && competition.CurrentSeason.Rounds[0].SeasonType === 1) {
        roundId = competition.CurrentSeason.Rounds[0].RoundId;
        console.log(`roundId: ${roundId}`);
        scheduleGrabber(roundId);
        
        for (let i = 0; i < competition.Teams.length; i++) {
          for (let j = 0; j < competition.Teams[i].Players.length; j++) {
            leaguePlayers.push(competition.Teams[i].Players[j].PlayerId);
          }
        }
        console.log(`number of leaguePlayers: ${leaguePlayers.length}`);
      }
      // the following else-if block is to catch the clausura if the league in question is Liga MX
      else if (competition.CurrentSeason.Rounds[4].CurrentRound === true && competition.CurrentSeason.Rounds[4].SeasonType === 1) {
        roundId = competition.CurrentSeason.Rounds[4].RoundId;
        console.log(`roundId: ${roundId}`);
        scheduleGrabber(roundId);
      }
    }
    else {
      console.log(`${competition.Name} has finished`);
    }
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

competitionFixturesGrabber(12);

exports.scheduleGrabber = scheduleGrabber;
exports.playerGameStatsGrabber = playerGameStatsGrabber;
exports.playerSeasonStatsGrabber = playerSeasonStatsGrabber;
exports.competitionFixturesGrabber = competitionFixturesGrabber;