const {saveMatches} = require("./saveMatches_function.js");
  
function saveToDB(resolvedSchedule) {
  resolvedSchedule.map(week => {
    let matchArray = week.matches;
    saveMatches(matchArray);
  });
}

module.exports = {
  saveToDB
};