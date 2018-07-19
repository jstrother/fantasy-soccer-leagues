const {calculateScores} = require("./calculateScores_function.js"),
  {saveToDB} = require("./saveToDB_function.js");

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
  
  let resolvedClubs = saveToDB(resolvedSchedule);
  console.log('resolvedClubs:', resolvedClubs);
  
  return resolvedSchedule;
}

module.exports = {
  matchResolver
};