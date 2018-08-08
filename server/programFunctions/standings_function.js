const {standingsCalculator} = require("./standingsCalculator_function.js"),
  {clubStats} = require("./clubStats_function.js");

function standings(clubArray, matchArray) {
  let resolvedClubsArray = [];
  clubArray.map(club => {
    let thisClub = club;
    const finishedMatchArray = matchArray.filter(match => match.final === true);
    const finishedHomeMatches = finishedMatchArray.filter(match => club._id.equals(match.homeClub._id));
    const finishedAwayMatches = finishedMatchArray.filter(match => club._id.equals(match.awayClub._id));
    finishedHomeMatches.map(match => {
      thisClub = clubStats(thisClub, match.homeScore, match.awayScore);
    });
    finishedAwayMatches.map(match => {
      thisClub = clubStats(thisClub, match.awayScore, match.homeScore);
    });
    resolvedClubsArray.push(thisClub);
  });
  return standingsCalculator(resolvedClubsArray);
}

module.exports = {
  standings
};