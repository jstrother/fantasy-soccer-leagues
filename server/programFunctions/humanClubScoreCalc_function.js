function humanClubScoreCalc(matchArray) {
  let resolvedMatchArray = matchArray.map(match => {
    if (match.final === false) {
      if (match.homeClub.clubName !== 'Average') {
        return (
          {
            homeScore: scoreCalc(match.homeClub)
          }
        );
      }
      if (match.awayClub.clubName !== 'Average') {
        return (
          {
            awayScore: scoreCalc(match.awayClub)
          }
        );
      }
    }
  });
  
  console.log('humanClubScoreCalc:', resolvedMatchArray);
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