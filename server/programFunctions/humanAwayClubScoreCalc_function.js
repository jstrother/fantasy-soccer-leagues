const {humanScoreCalc} = require("./humanScoreCalc_function.js");

function humanAwayClubScoreCalc(matchArray) {
  let resolvedMatchArray = matchArray.map(match => {
    if (match.final === false) {
      if (match.awayClub.clubName !== 'Average') {
        let resolvedMatch = {
          _id: match._id,
          homeClub: match.homeClub,
          homeScore: match.homeScore,
          awayClub: match.awayClub,
          awayScore: humanScoreCalc(match.awayClub),
          final: match.final
        };
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
  return resolvedMatchArray;
}

module.exports = {
  humanAwayClubScoreCalc
};