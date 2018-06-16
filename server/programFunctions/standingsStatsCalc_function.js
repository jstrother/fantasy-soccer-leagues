function standingsStatsCalc(matchArray) {
  let resolvedMatchArray = matchArray.map(match => {
    if (match.final === false) {
      let resolvedMatch = JSON.parse(JSON.stringify(match));
      resolvedMatch.final = true;
      resolvedMatch.homeClub = clubStats(match.homeClub, match.homeScore, match.awayScore);
      resolvedMatch.awayClub = clubStats(match.awayClub, match.awayScore, match.homeScore);
      return resolvedMatch;
    }
    if (match.final === true) {
      return match;
    }
  });
  
  return resolvedMatchArray;
  
  function clubStats(club, clubScore, opponentScore) {
    let clubArray = [club];
    
    let updatedClubArray = clubArray.map(club => {
      if (clubScore > opponentScore) {
        let updatedClub = JSON.parse(JSON.stringify(club));
        updatedClub.wins += 1;
        updatedClub.points += 3;
        updatedClub.goalsFor += clubScore;
        updatedClub.goalsAgainst += opponentScore;
        updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
        updatedClub.gamesPlayed += 1;
        return updatedClub;
      }
      
      if (opponentScore > clubScore) {
        let updatedClub = JSON.parse(JSON.stringify(club));
        updatedClub.losses += 1;
        updatedClub.goalsFor += clubScore;
        updatedClub.goalsAgainst += opponentScore;
        updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
        updatedClub.gamesPlayed += 1;
        return updatedClub;
      }
      
      if (clubScore === opponentScore) {
        let updatedClub = JSON.parse(JSON.stringify(club));
        updatedClub.draws += 1;
        updatedClub.points += 1;
        updatedClub.goalsFor += clubScore;
        updatedClub.goalsAgainst += opponentScore;
        updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
        updatedClub.gamesPlayed += 1;
        return updatedClub;
      }
    });
    return updatedClubArray[0];
  }
}

module.exports = {
  standingsStatsCalc
};