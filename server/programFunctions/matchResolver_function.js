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
  
  resolvedSchedule
  .map(week => week.matches)
  .filter(matches => {
    console.log('matches:', matches);
  });
  
  return resolvedSchedule;
}

module.exports = {
  matchResolver
};