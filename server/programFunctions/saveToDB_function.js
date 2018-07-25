const {saveMatches} = require("./saveMatches_function.js"),
  {saveClub} = require("./saveClub_function.js");
  
function saveToDB(resolvedSchedule) {
  resolvedSchedule.map(week => {
    let matchArray = week.matches;
    saveMatches(matchArray);
    matchArray.map(match => {
      if (match.final === true) {
        saveClub(match.homeClub)
        .then(() => {
          saveClub(match.awayClub);
        });
      }
    });
  });
}

module.exports = {
  saveToDB
};