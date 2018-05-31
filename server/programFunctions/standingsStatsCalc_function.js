const {computerClubScoreCalc} = require("./computerClubScoreCalc_function.js");

function standingsStatsCalc(matchArray) {
  const matchArrayAllScores = computerClubScoreCalc(matchArray);
  let resolvedMatchArray = [];
  
  matchArrayAllScores.forEach(match => {
    if (match.final === false) {
      match.final = true;
      match.homeClub = clubStats(match.homeClub, match.homeScore, match.awayScore);
      match.awayClub = clubStats(match.awayClub, match.awayScore, match.homeScore);
    }
    resolvedMatchArray.push(match);
  });
  
  return resolvedMatchArray;
  
  function clubStats(club, clubScore, opponentScore) {
    if (clubScore > opponentScore) {
      club.wins += 1;
      club.points += 3;
    }
    
    if (opponentScore > clubScore) {
      club.losses += 1;
    }
    
    if (clubScore === opponentScore) {
      club.draws += 1;
      club.points += 1;
    }
    club.gamesPlayed += 1;
    club.goalsFor += clubScore;
    club.goalsAgainst += opponentScore;
    club.goalDifferential = club.goalsFor - club.goalsAgainst;
    return club;
  }
}

module.exports = {
  standingsStatsCalc
};