function clubStats(club, clubScore, opponentScore) {
  
  let updatedClub = JSON.parse(JSON.stringify(club));
  if (clubScore > opponentScore) {
    updatedClub.wins += 1;
    updatedClub.points += 3;
    updatedClub.goalsFor += clubScore;
    updatedClub.goalsAgainst += opponentScore;
    updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
    updatedClub.gamesPlayed += 1;
    return updatedClub;
  }
  
  if (opponentScore > clubScore) {
    updatedClub.losses += 1;
    updatedClub.goalsFor += clubScore;
    updatedClub.goalsAgainst += opponentScore;
    updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
    updatedClub.gamesPlayed += 1;
    return updatedClub;
  }
  
  if (clubScore === opponentScore) {
    updatedClub.draws += 1;
    updatedClub.points += 1;
    updatedClub.goalsFor += clubScore;
    updatedClub.goalsAgainst += opponentScore;
    updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
    updatedClub.gamesPlayed += 1;
    return updatedClub;
  }
  
  return updatedClub;
}

module.exports = {
  clubStats
};