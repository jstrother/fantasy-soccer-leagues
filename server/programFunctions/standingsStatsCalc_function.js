const {clubStats} = require("./clubStats_function.js");

function standingsStatsCalc(match) {
  let resolvedMatch = JSON.parse(JSON.stringify(match));
  resolvedMatch.homeClub = clubStats(match.homeClub, match.homeScore, match.awayScore);
  resolvedMatch.awayClub = clubStats(match.awayClub, match.awayScore, match.homeScore);
  resolvedMatch.final = true;
  // console.log('resolvedMatch.homeClub:', resolvedMatch.homeClub.gamesPlayed);
  return resolvedMatch;
}

module.exports = {
  standingsStatsCalc
};