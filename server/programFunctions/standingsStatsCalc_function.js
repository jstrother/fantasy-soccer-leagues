const {clubStats} = require("./clubStats_function.js");

function standingsStatsCalc(match) {
  let resolvedMatch = JSON.parse(JSON.stringify(match));
  resolvedMatch.final = true;
  resolvedMatch.homeClub = clubStats(match.homeClub, match.homeScore, match.awayScore);
  resolvedMatch.awayClub = clubStats(match.awayClub, match.awayScore, match.homeScore);
  return resolvedMatch;
  
  // let resolvedMatchArray = matchArray.map(match => {
  //   if (match.final === false) {
  //     console.log('match.false:', match.final);
      
  //   }
  //   if (match.final === true) {
  //     console.log('match.true:', match.final);
  //     // we are doing clubStats() again to make sure all data is saved in db as there were issues before these two lines were added
  //     clubStats(match.homeClub, match.homeScore, match.awayScore);
  //     clubStats(match.awayClub, match.homeScore, match.awayScore);
  //     return JSON.parse(JSON.stringify(match));
  //   }
  // });
  // return resolvedMatchArray;
}

module.exports = {
  standingsStatsCalc
};