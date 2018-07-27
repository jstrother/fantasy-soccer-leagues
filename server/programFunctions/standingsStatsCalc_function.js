const {clubStats} = require("./clubStats_function.js");

function standingsStatsCalc(match) {
  console.log('standingsStatsCalc match.final:', match.final);
  if (match.final === false) {
    let resolvedMatch = JSON.parse(JSON.stringify(match));
    resolvedMatch.homeClub = clubStats(match.homeClub, match.homeScore, match.awayScore);
    resolvedMatch.awayClub = clubStats(match.awayClub, match.awayScore, match.homeScore);
    resolvedMatch.final = true;
    return resolvedMatch;
  }
  if (match.final === true) {
    return JSON.parse(JSON.stringify(match));
  }
}

module.exports = {
  standingsStatsCalc
};