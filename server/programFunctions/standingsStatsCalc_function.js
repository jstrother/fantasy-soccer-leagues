const {clubStats} = require("./clubStats_function.js");

function standingsStatsCalc(match) {
  let resolvedMatch = JSON.parse(JSON.stringify(match));
  resolvedMatch.final = true;
  resolvedMatch.homeClub = clubStats(match.homeClub, match.homeScore, match.awayScore);
  resolvedMatch.awayClub = clubStats(match.awayClub, match.awayScore, match.homeScore);
  return resolvedMatch;
}

module.exports = {
  standingsStatsCalc
};