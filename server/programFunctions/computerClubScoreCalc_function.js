function computerClubScoreCalc(averageClubScore, match) {
  if (match.homeClub.clubName === 'Average') {
    let resolvedMatch = JSON.parse(JSON.stringify(match));
    resolvedMatch.homeScore = averageClubScore;
    return resolvedMatch;
  }
  if (match.awayClub.clubName === 'Average') {
    let resolvedMatch = JSON.parse(JSON.stringify(match));
    resolvedMatch.awayScore = averageClubScore;
    return resolvedMatch;
  }
  if (match.homeClub.clubName !== 'Average' && match.awayClub.clubName !== 'Average') {
    return match;
  }
  
  // let resolvedMatchArray = matchArray.map(match => {
  //   if (match.final === false) {
      
  //   }
  //   if (match.final === true) {
  //     return JSON.parse(JSON.stringify(match));
  //   }
  // });
  // return resolvedMatchArray;
}

module.exports = {
  computerClubScoreCalc
};