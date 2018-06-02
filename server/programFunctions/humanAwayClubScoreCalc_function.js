const {humanScoreCalc} = require("./humanScoreCalc_function.js");

function humanAwayClubScoreCalc(matchArray) {
  let resolvedMatchArray = matchArray.map(match => {
    if (match.final === false) {
      if (match.awayClub.clubName !== 'Average') {
        return (
          {
            _id: match._id,
            homeClub: match.homeClub,
            awayClub: match.awayClub,
            awayScore: humanScoreCalc(match.awayClub),
            homeScore: match.homeScore,
            final: match.final
          }
        );
      }
      if (match.awayClub.clubName === 'Average') {
        return (
          {
            _id: match._id,
            homeClub: match.homeClub,
            awayClub: match.awayClub,
            awayScore: match.awayScore,
            homeScore: match.homeScore,
            final: match.final
          }
        );
      }
    }
    if (match.final === true) {
      // we aren't worried about checking for the averageClub here as the match has already been calculated at this point
      return (
        {
          awayScore: match.awayScore
        }
      );
    }
  });
  
  return resolvedMatchArray;
}

module.exports = {
  humanAwayClubScoreCalc
};