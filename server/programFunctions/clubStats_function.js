const {saveClubs} = require("./saveClubs_function.js");

function clubStats(club, clubScore, opponentScore) {
  let clubArray = [club];
  
  let updatedClubArray = clubArray.map(club => {
    // console.log('club:', club);
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
  saveClubs(updatedClubArray[0]);
  updatedClubArray.forEach(club => {
    // console.log('club1:', club);
  });
  return updatedClubArray[0];
}

module.exports = {
  clubStats
};