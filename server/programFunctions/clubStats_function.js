const {saveClub} = require("./saveClub_function.js");

function clubStats(club, clubScore, opponentScore) {
  
  let updatedClub = JSON.parse(JSON.stringify(club));
  if (clubScore > opponentScore) {
    if (club.clubName === 'Strikers \'87') {
      console.log('club before update:');
      console.log('goalsFor:', club.goalsFor);
      console.log('goalsAgainst:', club.goalsAgainst);
      console.log('goalDifferential:', club.goalDifferential);
      console.log('wins:', club.wins);
      console.log('draws:', club.draws);
      console.log('losses:', club.losses);
      console.log('points:', club.points);
      console.log('gamesPlayed:', club.gamesPlayed);
      console.log('');
    }
    updatedClub.wins += 1;
    updatedClub.points += 3;
    updatedClub.goalsFor += clubScore;
    updatedClub.goalsAgainst += opponentScore;
    updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
    updatedClub.gamesPlayed += 1;
    saveClub(updatedClub);
    return updatedClub;
  }
  
  if (opponentScore > clubScore) {
    if (club.clubName === 'Strikers \'87') {
      console.log('club before update:');
      console.log('goalsFor:', club.goalsFor);
      console.log('goalsAgainst:', club.goalsAgainst);
      console.log('goalDifferential:', club.goalDifferential);
      console.log('wins:', club.wins);
      console.log('draws:', club.draws);
      console.log('losses:', club.losses);
      console.log('points:', club.points);
      console.log('gamesPlayed:', club.gamesPlayed);
      console.log('');
    }
    updatedClub.losses += 1;
    updatedClub.goalsFor += clubScore;
    updatedClub.goalsAgainst += opponentScore;
    updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
    updatedClub.gamesPlayed += 1;
    saveClub(updatedClub);
    return updatedClub;
  }
  
  if (clubScore === opponentScore) {
    if (club.clubName === 'Strikers \'87') {
      console.log('club before update:');
      console.log('goalsFor:', club.goalsFor);
      console.log('goalsAgainst:', club.goalsAgainst);
      console.log('goalDifferential:', club.goalDifferential);
      console.log('wins:', club.wins);
      console.log('draws:', club.draws);
      console.log('losses:', club.losses);
      console.log('points:', club.points);
      console.log('gamesPlayed:', club.gamesPlayed);
      console.log('');
    }
    updatedClub.draws += 1;
    updatedClub.points += 1;
    updatedClub.goalsFor += clubScore;
    updatedClub.goalsAgainst += opponentScore;
    updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
    updatedClub.gamesPlayed += 1;
    saveClub(updatedClub);
    return updatedClub;
  }
}

module.exports = {
  clubStats
};