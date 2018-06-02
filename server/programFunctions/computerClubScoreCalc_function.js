const {humanHomeClubScoreCalc} = require("./humanHomeClubScoreCalc_function.js"),
  {humanAwayClubScoreCalc} = require("./humanAwayClubScoreCalc_function.js");

function computerClubScoreCalc(matchArray) {
  const matchArrayHumanClubScores = humanAwayClubScoreCalc(humanHomeClubScoreCalc(matchArray)),
    allScores = allScoresCalc(matchArrayHumanClubScores),
    totalHumanClubs = humanClubCounter(matchArray);
  console.log('matchArrayHumanClubScores:', matchArrayHumanClubScores);
  let resolvedMatchArray = matchArrayHumanClubScores.map(match => {
    if (match.final === false) {
      if (match.homeClub.clubName === 'Average') {
        return (
          {
            _id: match._id,
            homeClub: match.homeClub,
            awayClub: match.awayClub,
            homeScore: clubScore(),
            awayScore: match.awayScore,
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
            homeScore: match.homeScore,
            awayScore: clubScore(),
            final: match.final
          }
        );
      }
      if (match.homeClub.clubName !== 'Average' && match.awayClub.clubName !== 'Average') {
        return (
          {
            _id: match._id,
            homeClub: match.homeClub,
            awayClub: match.awayClub,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            final: match.final
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