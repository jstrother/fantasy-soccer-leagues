const FantasyMatch = require("../../models/fantasyMatch_model.js"),
  {standingsCalculator} = require("./standingsCalculator_function.js"),
  {clubStats} = require("./clubStats_function.js");

function standings(clubArray) {
  const resolvedClubArray = clubArray.map(club => {
    return resolvedclubScores(club);
  });
  
  return standingsCalculator(resolvedClubArray);
  
  function resolvedclubScores(club) {
    const matchArray = FantasyMatch.find();
    console.log('matchArray:', matchArray);
    
    // const finishedMatches = matchArray.map(match => {
    //   if (match.final === true) {
    //     return true;
    //   }
    // });
    
    // const resolvedClubScores = finishedMatches.map(match => {
    //   if (match.homeClub._id === club._id) {
    //     return clubStats(club, match.homeScore, match.awayScore);
    //   }
    //   if (match.awayClub._id === club._id) {
    //     return clubStats(club, match.awayScore, match.homeScore);
    //   }
    // });
    
    // return resolvedClubScores;
  }
}

module.exports = {
  standings
};