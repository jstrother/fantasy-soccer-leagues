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
    return JSON.parse(JSON.stringify(match));
  }
}

module.exports = {
  computerClubScoreCalc
};