function computerClubScoreCalc(averageClubScore, match) {
  console.log('computerClubScoreCalc match.final:', match.final);
  if (match.final === false) {
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
      return JSON.parse(JSON.stringify(match));
    }
  }
  if (match.final === true) {
    return JSON.parse(JSON.stringify(match));
  }
}

module.exports = {
  computerClubScoreCalc
};