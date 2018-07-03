/*eslint-disable no-console*/
const {saveMatches} = require("./saveMatches_function.js"),
  {saveClub} = require("./saveClub_function.js"),
  {calculateScores} = require("./calculateScores_function.js");

function matchResolver(fullSchedule) {
  const today = new Date().getTime();
  let resolvedSchedule = fullSchedule.map(weeklyMatches => {
    // weeklyMatches is one week's worth of matches
    const datesToRun = weeklyMatches.datesToRun.getTime();
    if (today >= datesToRun) {
      return calculateScores(weeklyMatches);
    }
    if (today < datesToRun) {
      return JSON.parse(JSON.stringify(weeklyMatches));
    }
  });
  
  resolvedSchedule.forEach(week => {
    week.matches.forEach(match => {
      if (match.final === true) {
        console.log('homeClub.gamesPlayed:', match.homeClub.gamesPlayed);
        console.log('awayClub.gamesPlayed:', match.awayClub.gamesPlayed);
      }
    });
  });
  
  let roundNumbersArray = [];
  
  resolvedSchedule.map(week => {
    let matchArray = week.matches;
    saveMatches(matchArray);
    matchArray.filter(match => {
      if (match.final === true) {
        roundNumbersArray.push(week.roundNumber);
      }
    });
  });
  
  let highestRoundNumber = Math.max(...roundNumbersArray);
  console.log('highestRoundNumber:', highestRoundNumber);
  resolvedSchedule.map(week => {
    if (week.roundNumber === highestRoundNumber) {
      week.matches.forEach(match => {
        saveClub(match.homeClub);
        saveClub(match.awayClub);
      });
    }
  });
  
  return resolvedSchedule;
}

module.exports = {
  matchResolver
};