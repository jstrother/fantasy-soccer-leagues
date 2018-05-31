const {humanClubScoreCalc} = require("./humanClubScoreCalc_function.js");

function computerClubScoreCalc(matchArray) {
  const matchArrayHumanClubScores = humanClubScoreCalc(matchArray),
    allScores = allScoresCalc(matchArrayHumanClubScores),
    totalHumanClubs = humanClubCounter(matchArray);
  let resolvedMatchArray = [];
  
  matchArrayHumanClubScores.forEach(match => {
    // we take one less than the total totalNumberClubs as we need the average of all human-operated fantasyClubs
    if (match.final === false) {
      if(match.homeClub.clubName === 'Average') {
        match.homeScore = clubScore();
      }
      if(match.awayClub.clubName === 'Average') {
        match.awayScore = clubScore();
      }
    }
    resolvedMatchArray.push(match);
  });
  
  return resolvedMatchArray;
  
  function allScoresCalc(humanClubScores) {
    // humanClubScores is an array of matches with the scores filled in for any club run by a real person
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