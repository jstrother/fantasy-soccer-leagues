const {humanScoreCalc} = require("./humanScoreCalc_function.js");

function humanHomeClubScoreCalc(match) {
  let resolvedMatch = JSON.parse(JSON.stringify(match));
  resolvedMatch.homeScore = humanScoreCalc(match.homeClub);
  return resolvedMatch;
  
  // let resolvedMatchArray = matchArray.map(match => {
  //   if (match.final === false) {
  //     if (match.homeClub.clubName !== 'Average') {
        
  //     }
  //     if (match.homeClub.clubName === 'Average') {
  //       return match;
  //     }
  //   }
  //   if (match.final === true) {
  //     // we aren't worried about checking for the averageClub here as the match has already been calculated at this point
  //     return JSON.parse(JSON.stringify(match));
  //   }
  // });
  // return resolvedMatchArray;
}

module.exports = {
  humanHomeClubScoreCalc
};