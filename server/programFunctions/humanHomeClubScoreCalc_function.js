const {humanScoreCalc} = require("./humanScoreCalc_function.js");

function humanHomeClubScoreCalc(matchArray) {
  let resolvedMatchArray = matchArray.map(match => {
    if (match.final === false) {
      if (match.homeClub.clubName !== 'Average') {
        return (
          {
            _id: match._id,
            homeClub: match.homeClub,
            awayClub: match.awayClub,
            homeScore: humanScoreCalc(match.homeClub),
            awayScore: match.awayScore,
            final: match.final
          }
        );
      }
      if (match.homeClub.clubName === 'Average') {
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
  humanHomeClubScoreCalc
};