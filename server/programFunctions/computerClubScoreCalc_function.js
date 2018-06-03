function computerClubScoreCalc(matchArray) {
  console.log('computerClubScoreCalc matchArray:', matchArray);
  let resolvedMatchArray = matchArray.map(match => {
    if (match.final === false) {
      if (match.homeClub.clubName === 'Average') {
        return (
          {
            _id: match._id,
            homeClub: match.homeClub,
            awayClub: match.awayClub,
            homeScore: clubScore(),
            awayScore: match.awayScore,
            final: match.final
          }
        );
      }
      if (match.awayClub.clubName === 'Average') {
        return (
          {
            _id: match._id,
            homeClub: match.homeClub,
            awayClub: match.awayClub,
            homeScore: match.homeScore,
            awayScore: clubScore(),
            final: match.final
          }
        );
      }
      if (match.homeClub.clubName !== 'Average' && match.awayClub.clubName !== 'Average') {
        return (
          {
            _id: match._id,
            homeClub: match.homeClub,
            awayClub: match.awayClub,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            final: match.final
          }
        );
      }
    }
  });
  
  return resolvedMatchArray;
  
  function clubScore() {
    return Math.round(allScoresCalc() / humanClubCounter());
  }
  
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
  computerClubScoreCalc
};