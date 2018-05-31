function humanClubScoreCalc(matchArray) {
  let resolvedMatchArray = [];
  matchArray.forEach(match => {
    if (match.final === false) {
      if (match.homeClub.clubName !== 'Average') {
        match.homeScore = scoreCalc(match.homeClub);
      }
      if (match.awayClub.clubName !== 'Average') {
        match.awayScore = scoreCalc(match.awayClub);
      }
    }
    resolvedMatchArray.push(match);
  });
  
  return resolvedMatchArray;
  
  function scoreCalc(club) {
    let score = 0;
    club.starters.forEach(starter => {
      score += starter.fantasyPoints.fixture;
    });
    return score;
  }
}

module.exports = {
  humanClubScoreCalc
};