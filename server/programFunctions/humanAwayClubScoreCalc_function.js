const {humanScoreCalc} = require("./humanScoreCalc_function.js");

function humanAwayClubScoreCalc(matchArray) {
  let resolvedMatchArray = matchArray.map(match => {
    if (match.final === false) {
      if (match.awayClub.clubName !== 'Average') {
        let resolvedMatch = JSON.parse(JSON.stringify(match));
        resolvedMatch.awayScore = humanScoreCalc(match.awayClub);
        return resolvedMatch;
      }
      if (match.awayClub.clubName === 'Average') {
        return match;
      }
    }
    if (match.final === true) {
      // we aren't worried about checking for the averageClub here as the match has already been calculated at this point
      return match;
    }
  });
  // console.log('humanAwayClubScoreCalc:', resolvedMatchArray);
  return resolvedMatchArray;
}

module.exports = {
  humanAwayClubScoreCalc
};