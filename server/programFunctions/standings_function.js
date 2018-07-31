const {standingsCalculator} = require("./standingsCalculator_function.js"),
  {clubStats} = require("./clubStats_function.js");

function standings(clubArray, matchArray) {
  const resolvedClubs = matchArray.map(match => {
    if(match.final === true) {
      clubArray.map(club => {
        console.log('homeClub:', match.homeClub._id); // this line is logged
        console.log('awayClub:', match.awayClub._id); // this line is logged
        console.log('club:', club._id); // this line is logged
        if(club._id !== match.homeClub._id) {
          console.log('Oscar'); // this line is NOT logged
        }
        if(club._id !== match.awayClub._id) {
          console.log('Buster'); // this line is NOT logged
        }
      });
    }
  });
  
  return standingsCalculator(resolvedClubs);
}

module.exports = {
  standings
};