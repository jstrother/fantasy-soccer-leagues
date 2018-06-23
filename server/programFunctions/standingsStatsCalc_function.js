const {clubStats} = require("./clubStats_function.js");

function standingsStatsCalc(matchArray) {
  let resolvedMatchArray = matchArray.map(match => {
    if (match.final === false) {
      let resolvedMatch = JSON.parse(JSON.stringify(match));
      resolvedMatch.final = true;
      resolvedMatch.homeClub = clubStats(match.homeClub, match.homeScore, match.awayScore);
      resolvedMatch.awayClub = clubStats(match.awayClub, match.awayScore, match.homeScore);
      return resolvedMatch;
    }
    if (match.final === true) {
      return match;
    }
  });
  // console.log('standingsStatsCalc:', resolvedMatchArray);
  return resolvedMatchArray;
}

module.exports = {
  standingsStatsCalc
};