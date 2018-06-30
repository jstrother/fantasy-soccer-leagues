function averageClubScoreCalc(matchArray) {
  return Math.round(allScoresCalc() / humanClubCounter());
  
  function allScoresCalc() {
    let scores = 0;
    matchArray.forEach(match => {
      scores += match.homeScore;
      scores += match.awayScore;
    });
    return scores;
  }
  
  function humanClubCounter() {
    let total = 0;
    matchArray.forEach(match => {
      if (match.homeClub.clubName !== 'Average') {
        total++;
      }
      if (match.awayClub.clubName !== 'Average') {
        total++;
      }
    });
    return total;
  }
}

module.exports = {
  averageClubScoreCalc
};