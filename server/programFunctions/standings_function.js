const {standingsCalculator} = require("./standingsCalculator_function.js"),
  {clubStats} = require("./clubStats_function.js");

function standings(clubArray, matchArray) {
  // let resolvedClubsArray = clubArray;
  // matchArray.map(match => {
  //   if (match.final === true) {
  //     let homeClub = resolvedClubsArray.filter(club => club._id.equals(match.homeClub._id));
  //     // remember that the filter method above returns an array!
  //     const resolvedHomeClub = clubStats(homeClub[0], match.homeScore, match.awayScore);
  //     console.log('resolvedHomeClub:', resolvedHomeClub);
  //   }
  // });
  
  
  const resolvedClubsArray = matchArray.map(match => {
    if(match.final === true) {
      clubArray.map(club => {
        if(club._id.equals(match.homeClub._id)) {
          // console.log('Oscar');
          club = clubStats(club, match.homeScore, match.awayScore);
          console.log('homeClub:', club.gamesPlayed);
          // return club;
        }
        if(club._id.equals(match.awayClub._id)) {
          // console.log('Buster');
          club = clubStats(club, match.awayScore, match.homeScore);
          console.log('awayClub:', club.gamesPlayed);
          // return club;
        }
      });
    }
  });
  // console.log('resolvedClubsArray:', resolvedClubsArray);
  return standingsCalculator(resolvedClubsArray);
}

module.exports = {
  standings
};

// const {standingsCalculator} = require("./standingsCalculator_function.js"),
//   {clubStats} = require("./clubStats_function.js");

// function standings(clubArray, matchArray) {
//   const resolvedClubs = matchArray.map(match => {
//     if(match.final === true) {
//       clubArray.map(club => {
//         if(club._id.equals(match.homeClub._id)) {
//           console.log('Oscar');
//         }
//         if(club._id.equals(match.awayClub._id)) {
//           console.log('Buster');
//         }
//       });
//     }
//   });
  
//   return standingsCalculator(resolvedClubs);
// }

// module.exports = {
//   standings
// };