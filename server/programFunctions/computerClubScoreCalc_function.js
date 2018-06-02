const {humanClubScoreCalc} = require("./humanClubScoreCalc_function.js");

function computerClubScoreCalc(matchArray) {
  const matchArrayHumanClubScores = humanClubScoreCalc(matchArray),
    allScores = allScoresCalc(matchArrayHumanClubScores),
    totalHumanClubs = humanClubCounter(matchArray);
  let resolvedMatchArray = matchArrayHumanClubScores.map(match => {
    if (match.final === false) {
      if(match.homeClub.clubName === 'Average') {
        return (
          {
            homeScore: clubScore()
          }
        );
      }
      if(match.awayClub.clubName === 'Average') {
        return (
          {
            awayScore: clubScore()
          }
        );
      }
    }
  });
  
  console.log('computerClubScoreCalc:', resolvedMatchArray);
  return resolvedMatchArray;
  
  function allScoresCalc(humanClubScores) {
    // humanClubScores is an array of matches with the scores already calculated for any club run by a real person
    let scores = 0;
    humanClubScores.forEach(match => {
      scores += match.homeScore;
      scores += match.awayScore;
    });
    return scores;
  }
  
  function clubScore() {
    return (allScores / totalHumanClubs);
  }
  
  function humanClubCounter(matchArray) {
    let total = 0;
    matchArray.forEach(match => {
      if (match.homeClub.clubName !== 'Average') {
        total++;
      }
      if (match.awayClub.clubName !== 'Average') {
        total++;
      }
    });
    return total;
  }
}

module.exports = {
  computerClubScoreCalc
};