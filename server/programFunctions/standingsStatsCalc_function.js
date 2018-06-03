const {computerClubScoreCalc} = require("./computerClubScoreCalc_function.js");

function standingsStatsCalc(matchArray) {
  const matchArrayAllScores = computerClubScoreCalc(matchArray);
  let resolvedMatchArray = matchArrayAllScores.map(match => {
    if (match.final === false) {
      return (
        {
          _id: match._id,
          homeScore: match.homeScore,
          awayScore: match.awayScore,
          final:  true,
          homeClub: clubStats(match.homeClub, match.homeScore, match.awayScore),
          awayClub: clubStats(match.awayClub, match.awayScore, match.homeScore) 
        }
      );
    }
    if (match.final === true) {
      return match;
    }
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