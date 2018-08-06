const {standingsCalculator} = require("./standingsCalculator_function.js"),
  {clubStats} = require("./clubStats_function.js");

function standings(clubArray, matchArray) {
  const resolvedClubs = matchArray.map(match => {
    if(match.final === true) {
      clubArray.map(club => {
        if(club._id.equals(match.homeClub._id)) {
          console.log('Oscar');
        }
        if(club._id.equals(match.awayClub._id)) {
          console.log('Buster');
        }
      });
    }
  });
  
  return standingsCalculator(resolvedClubs);
}

module.exports = {
  standings
};