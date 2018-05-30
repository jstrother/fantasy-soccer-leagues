function computerClubScoresCalc(matchArray, humanClubScores, clubArrayLength) {
  let allScores = 0;
  
  matchArray.forEach(match => {
    // we take one less than the total clubArrayLength as we need the average of all human-operated fantasyClubs
    if (match.final === false) {
      if(match.homeClub.clubName === 'Average') {
        match.homeScore = allScores / (clubArrayLength - 1);
      }
      if(match.awayClub.clubName === 'Average') {
        match.awayScore = allScores / (clubArrayLength - 1);
      }
    }
  });
  
  function allScoresCalc() {
    
  }
}

module.exports = {
  computerClubScoresCalc
};