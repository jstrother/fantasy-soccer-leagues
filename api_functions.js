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
    let match = [];
    for (let i = 0; i < schedule.length; i++) {
     match.push({
      gameId: schedule[i].GameId,
		  dateTime: schedule[i].DateTime.split('T', 1)[0],
		  status: schedule[i].Status,
		  winner: schedule[i].Winner,
		  awayTeamId: schedule[i].awayTeamId,
		  awayTeamName: schedule[i].AwayTeamName,
		  awayTeamScore: schedule[i].AwayTeamScore,
		  homeTeamId: schedule[i].homeTeamId,
		  homeTeamName: schedule[i].HomeTeamName,
		  homeTeamScore: schedule[i].HomeTeamScore
     });
  		// loop through all objects in resulting array
  		// console.log(`match: ${match[i].dateTime}`);
    }
    return match;
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
    let playerGame = {
      name: playerGameStats[0].Name,
			shortName: playerGameStats[0].ShortName,
			team: playerGameStats[0].Team,
			teamId: playerGameStats[0].TeamId,
			suspension: playerGameStats[0].Suspension,
			suspensionReason: playerGameStats[0].SuspensionReason,
			injuryStatus: playerGameStats[0].InjuryStatus,
			injuryBodyPart: playerGameStats[0].InjuryBodyPart,
			injuryNotes: playerGameStats[0].InjuryNotes,
			injuryStartDate: playerGameStats[0].InjuryStartDate,
			fantasyPoints: playerGameStats[0].FantasyPoints,
			position: playerGameStats[0].Position,
			minutes: playerGameStats[0].Minutes,
			goals: playerGameStats[0].Goals, // required for fantasy points calculations
			assists: playerGameStats[0].Assists, // required for fantasy points calculations
			shots: playerGameStats[0].Shots, // required for fantasy points calculations
			shotsOnGoal: playerGameStats[0].ShotsOnGoal, // required for fantasy points calculations
			yellowCards: playerGameStats[0].YellowCards, // required for fantasy points calculations
			redCards: playerGameStats[0].RedCards, // required for fantasy points calculations
			yellowRedCards: playerGameStats[0].YellowRedCards,
			crosses: playerGameStats[0].Crosses, // required for fantasy points calculations
			tacklesWon: playerGameStats[0].TacklesWon, // required for fantasy points calculations
			interceptions: playerGameStats[0].Interceptions, // required for fantasy points calculations
			ownGoals: playerGameStats[0].OwnGoals,
			fouls: playerGameStats[0].Fouls, // required for fantasy points calculations
			fouled: playerGameStats[0].Fouled, // required for fantasy points calculations
			offsides: playerGameStats[0].Offsides,
			passes: playerGameStats[0].Passes,
			passesCompleted: playerGameStats[0].PassesCompleted,
			defenderCleanSheets: playerGameStats[0].DefenderCleanSheets, //defenders only; required for fantasy points calculations
			gkSaves: playerGameStats[0].GoalkeeperSaves, //goalkeepers only; required for fantasy points calculations
			gkGoalsAgainst: playerGameStats[0].GoalkeeperGoalsAgainst, //goalkeepers only; required for fantasy points calculations
			gkCleanSheets: playerGameStats[0].GoalkeeperCleanSheets, //goalkeepers only; required for fantasy points calculations
			gkWins: playerGameStats[0].GoalkeeperWins, //goalkeepers only; required for fantasy points calculations
			pkGoals: playerGameStats[0].PenaltyKickGoals,
			pkMisses: playerGameStats[0].PenaltyKickMisses, // required for fantasy points calculations
			pkSaves: playerGameStats[0].PenaltyKickSaves //goalkeepers only; required for fantasy points calculations
    };
			
			return playerGame;
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
    let playerSeason = {
      name: playerSeasonStats[0].Name,
			shortName: playerSeasonStats[0].ShortName,
			team: playerSeasonStats[0].Team,
			teamId: playerSeasonStats[0].TeamId,
			suspension: playerSeasonStats[0].Suspension,
			suspensionReason: playerSeasonStats[0].SuspensionReason,
			injuryStatus: playerSeasonStats[0].InjuryStatus,
			injuryBodyPart: playerSeasonStats[0].InjuryBodyPart,
			injuryNotes: playerSeasonStats[0].InjuryNotes,
			injuryStartDate: playerSeasonStats[0].InjuryStartDate,
			fantasyPoints: playerSeasonStats[0].FantasyPoints,
			position: playerSeasonStats[0].Position,
			minutes: playerSeasonStats[0].Minutes,
			goals: playerSeasonStats[0].Goals, // required for fantasy points calculations
			assists: playerSeasonStats[0].Assists, // required for fantasy points calculations
			shots: playerSeasonStats[0].Shots, // required for fantasy points calculations
			shotsOnGoal: playerSeasonStats[0].ShotsOnGoal, // required for fantasy points calculations
			yellowCards: playerSeasonStats[0].YellowCards, // required for fantasy points calculations
			redCards: playerSeasonStats[0].RedCards, // required for fantasy points calculations
			yellowRedCards: playerSeasonStats[0].YellowRedCards,
			crosses: playerSeasonStats[0].Crosses, // required for fantasy points calculations
			tacklesWon: playerSeasonStats[0].TacklesWon, // required for fantasy points calculations
			interceptions: playerSeasonStats[0].Interceptions, // required for fantasy points calculations
			ownGoals: playerSeasonStats[0].OwnGoals,
			fouls: playerSeasonStats[0].Fouls, // required for fantasy points calculations
			fouled: playerSeasonStats[0].Fouled, // required for fantasy points calculations
			offsides: playerSeasonStats[0].Offsides,
			passes: playerSeasonStats[0].Passes,
			passesCompleted: playerSeasonStats[0].PassesCompleted,
			defenderCleanSheets: playerSeasonStats[0].DefenderCleanSheets, //defenders only; required for fantasy points calculations
			gkSaves: playerSeasonStats[0].GoalkeeperSaves, //goalkeepers only; required for fantasy points calculations
			gkGoalsAgainst: playerSeasonStats[0].GoalkeeperGoalsAgainst, //goalkeepers only; required for fantasy points calculations
			gkCleanSheets: playerSeasonStats[0].GoalkeeperCleanSheets, //goalkeepers only; required for fantasy points calculations
			gkWins: playerSeasonStats[0].GoalkeeperWins, //goalkeepers only; required for fantasy points calculations
			pkGoals: playerSeasonStats[0].PenaltyKickGoals,
			pkMisses: playerSeasonStats[0].PenaltyKickMisses, // required for fantasy points calculations
			pkSaves: playerSeasonStats[0].PenaltyKickSaves
    }; //goalkeepers only; required for fantasy points calculations
			
			return playerSeason;
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
      dateTime,
      leaguePlayers = [];
    if (competition.CurrentSeason.CurrentSeason === true) {
      if (competition.CurrentSeason.Rounds[0].CurrentRound === true && competition.CurrentSeason.Rounds[0].SeasonType === 1) {
        roundId = competition.CurrentSeason.Rounds[0].RoundId;
        
        for (let i = 0; i < competition.Teams.length; i++) {
          for (let j = 0; j < competition.Teams[i].Players.length; j++) {
            leaguePlayers.push(competition.Teams[i].Players[j].PlayerId);
          }
        }
        
        scheduleGrabber(roundId)
        .then((match) => {
          for (let k = 0; k < match.length; k++) {
            // console.log(`competitionFixturesGrabber- dateTimes: ${match[k].dateTime}`);
            // console.log(`checking if string: ${typeof match[k].dateTime === 'string'}`);
            for (let l = 0; l < leaguePlayers.length; l++) {
              playerGameStatsGrabber(match[l].dateTime, leaguePlayers[l])
              .then((playerGame) => {
                console.log(`playerGame: ${playerGame}`);
              });
            }
          }
        })
        .catch(error => {
          console.log(`error: ${error}`);
        });
      }
      // the following else-if block is to catch the clausura if the league in question uses apertura/clausura
      else if (competition.CurrentSeason.Rounds[4].CurrentRound === true && competition.CurrentSeason.Rounds[4].SeasonType === 1) {
        roundId = competition.CurrentSeason.Rounds[4].RoundId;
        dateTime = scheduleGrabber(roundId).dateTime;
      }
    }
  })
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

competitionFixturesGrabber(8);

exports.scheduleGrabber = scheduleGrabber;
exports.playerGameStatsGrabber = playerGameStatsGrabber;
exports.playerSeasonStatsGrabber = playerSeasonStatsGrabber;
exports.competitionFixturesGrabber = competitionFixturesGrabber;