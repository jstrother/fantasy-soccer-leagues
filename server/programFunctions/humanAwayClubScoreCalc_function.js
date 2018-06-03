const {humanScoreCalc} = require("./humanScoreCalc_function.js");

function humanAwayClubScoreCalc(matchArray) {
  // console.log('humanAwayClubScoreCalc matchArray:', matchArray);
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
        return match;
      }
    }
    if (match.final === true) {
      // we aren't worried about checking for the averageClub here as the match has already been calculated at this point
      return match;
    }
  });
  console.log('humanAwayClubScoreCalc resolvedMatchArray:', resolvedMatchArray);
  return resolvedMatchArray;
}

module.exports = {
  humanAwayClubScoreCalc
};