function computerClubScoreCalc(matchArray) {
  let resolvedMatchArray = matchArray.map(match => {
    if (match.final === false) {
      if (match.homeClub.clubName === 'Average') {
        let resolvedMatch = {
          _id: match._id,
          homeClub: match.homeClub,
          homeScore: clubScore(),
          awayClub: match.awayClub,
          awayScore: match.awayScore,
          final: match.final
        };
        return resolvedMatch;
      }
      if (match.awayClub.clubName === 'Average') {
        let resolvedMatch = {
          _id: match._id,
          homeClub: match.homeClub,
          homeScore: match.homeScore,
          awayClub: match.awayClub,
          awayScore: clubScore(),
          final: match.final
        };
        return resolvedMatch;
      }
      if (match.homeClub.clubName !== 'Average' && match.awayClub.clubName !== 'Average') {
        return match;
      }
    }
    if (match.final === true) {
      return match;
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