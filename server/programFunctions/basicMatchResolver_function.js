/*eslint-disable no-console*/
const {humanClubScoreCalc} = require("./humanClubScoreCalc_function.js");

function basicMatchResolver(fullSchedule, clubArray) {
  const today = new Date().getTime(),
    clubArrayLength = clubArray.length;
  
  let resolvedMatches = [];
    
  fullSchedule.forEach(weeklyMatches => {
    // weeklyMatches is one week's worth of matches
    let matchArray = weeklyMatches.matches;
    if (today > weeklyMatches.datesToRun.getTime()) {
      // first calculate fantasyPoints for each team run by a human
      let humanClubScores = humanClubScoreCalc(matchArray);
      // then calculate the points for averageClub if present
      
      // finally, compare scores and add to correct "column" (W, D, L)
      matchArray.forEach(match => {
        if (match.final === false) {
          match.final = true;
          if (match.homeScore > match.awayScore) {
            match.homeClub.wins += 1;
            match.homeClub.points += 3;
            match.awayClub.losses += 1;
          }
          if (match.awayScore > match.homeScore) {
            match.awayClub.wins += 1;
            match.awayClub.points += 3;
            match.homeClub.losses += 1;
          }
          if (match.homeScore === match.awayScore) {
            match.homeClub.draws += 1;
            match.homeClub.points += 1;
            match.awayClub.draws += 1;
            match.awayClub.points += 1;
          }
          match.homeClub.gamesPlayed += 1;
          match.homeClub.goalsFor += match.homeScore;
          match.homeClub.goalsAgainst += match.awayScore;
          match.homeClub.goalDifferential = match.homeClub.goalsFor - match.homeClub.goalsAgainst;
          
          match.awayClub.gamesPlayed += 1;
          match.awayClub.goalsFor += match.awayScore;
          match.awayClub.goalsAgainst += match.homeScore;
          match.awayClub.goalDifferential = match.awayClub.goalsFor - match.awayClub.goalsAgainst;
          resolvedMatches.push(match);
        }
      });
    }
  });
  return resolvedMatches;
}

module.exports = {
  basicMatchResolver
};

// can use loopArray_function.js to run matchResolver() once a week on the correct index in matchArray
// function matchResolver(fullSchedule, clubArray) {
//   const today = new Date().getTime(),
//     clubArrayLength = clubArray.length,
//     resolvedMatches = [];
  
//   fullSchedule.forEach(weeklyMatches => {
//     // weeklyMatches is one week's worth of matches
//     let allScores = 0,
//       matchArray = weeklyMatches.matches;
//     if (today > weeklyMatches.datesToRun.getTime()) {
//       // first calculate fantasyPoints for each team run by a human
//       matchArray.forEach(match => {
//         if (match.final === false) {
//           if (match.homeClub.clubName !== 'Average' && match.homeScore === 0) {
//             match.homeClub.starters.forEach(starter => {
//               match.homeScore += starter.fantasyPoints.fixture;
//             });
//             allScores += match.homeScore;
//           }
//           if (match.awayClub.clubName !== 'Average' && match.awayScore === 0) {
//             match.awayClub.starters.forEach(starter => {
//               match.awayScore += starter.fantasyPoints.fixture;
//             });
//             allScores += match.awayScore;
//           }
//         }
//       });
//       // then calculate the points for averageClub if present
//       matchArray.forEach(match => {
//         // we take one less than the total clubArray.length as we need the average of all human-operated fantasyClubs
//         if (match.final === false) {
//           if(match.homeClub.clubName === 'Average' && match.homeScore === 0) {
//             match.homeScore = allScores / (clubArrayLength - 1);
//           }
//           if(match.awayClub.clubName === 'Average' && match.awayScore === 0) {
//             match.awayScore = allScores / (clubArrayLength - 1);
//           }
//         }
//       });
//       // finally, compare scores and add to correct "column" (W, D, L)
//       matchArray.forEach(match => {
//         if (match.final === false) {
//           match.final = true;
//           if (match.homeScore > match.awayScore) {
//             match.homeClub.wins += 1;
//             match.homeClub.points += 3;
//             match.awayClub.losses += 1;
//           }
//           if (match.awayScore > match.homeScore) {
//             match.awayClub.wins += 1;
//             match.awayClub.points += 3;
//             match.homeClub.losses += 1;
//           }
//           if (match.homeScore === match.awayScore) {
//             match.homeClub.draws += 1;
//             match.homeClub.points += 1;
//             match.awayClub.draws += 1;
//             match.awayClub.points += 1;
//           }
//           match.homeClub.gamesPlayed += 1;
//           match.homeClub.goalsFor += match.homeScore;
//           match.homeClub.goalsAgainst += match.awayScore;
//           match.homeClub.goalDifferential = match.homeClub.goalsFor - match.homeClub.goalsAgainst;
          
//           match.awayClub.gamesPlayed += 1;
//           match.awayClub.goalsFor += match.awayScore;
//           match.awayClub.goalsAgainst += match.homeScore;
//           match.awayClub.goalDifferential = match.awayClub.goalsFor - match.awayClub.goalsAgainst;
          
//           resolvedMatches.push(match);
//         }
//       });
//     }
//     save(weeklyMatches);
//   });
  
//   console.log('resolvedMatches length:', resolvedMatches.length);
//   resolvedMatches.forEach(match => {
//     // update fantasyMatch in the database
//     FantasyMatch
//     .findByIdAndUpdate(
//       match._id,
//       {
//         homeScore: match.homeScore,
//         awayScore: match.awayScore,
//         final: match.final
//       }
//     )
//     .then((data) => {
//       console.log('match updated', data);
//     })
//     .catch(error => {
//       throw new Error(error);
//     });
//     // update the home fantasyClub in the database
//     FantasyClub
//     .findByIdAndUpdate(
//       match.homeClub._id,
//       {
//         wins: match.homeClub.wins,
//         draws: match.homeClub.draws,
//         losses: match.homeClub.losses,
//         points: match.homeClub.points,
//         goalsFor: match.homeClub.goalsFor,
//         goalsAgainst: match.homeClub.goalsAgainst,
//         goalDifferential: match.homeClub.goalDifferential,
//         gamesPlayed: match.homeClub.gamesPlayed
//       }
//     )
//     .then(() => {
//       console.log('homeClub updated');
//     })
//     .catch(error => {
//       throw new Error(error);
//     });
//     // update the away fantasyClub in the database
//     FantasyClub
//     .findByIdAndUpdate(
//       match.awayClub._id,
//       {
//         wins: match.awayClub.wins,
//         draws: match.awayClub.draws,
//         losses: match.awayClub.losses,
//         points: match.awayClub.points,
//         goalsFor: match.awayClub.goalsFor,
//         goalsAgainst: match.awayClub.goalsAgainst,
//         goalDifferential: match.awayClub.goalDifferential,
//         gamesPlayed: match.awayClub.gamesPlayed
//       }
//     )
//     .then(() => {
//       console.log('awayClub updated');
//     })
//     .catch(error => {
//       throw new Error(error);
//     });
//   });
  
//   return fullSchedule;
// }