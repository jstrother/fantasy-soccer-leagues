function standingsStatsCalc(matchArray) {
  console.log('standingsStatsCalc matchArray:', matchArray);
  let resolvedMatchArray = matchArray.map(match => {
    console.log('standingsStatsCalc match:', match);
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
    console.log('club:', club);
    return club;
  }
}

module.exports = {
  standingsStatsCalc
};