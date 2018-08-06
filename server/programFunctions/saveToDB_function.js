const {saveMatches} = require("./saveMatches_function.js"),
  {saveClub} = require("./saveClub_function.js");
  
function saveToDB(resolvedSchedule) {
  resolvedSchedule.map(week => {
    let matchArray = week.matches;
    saveMatches(matchArray);
    // the following was commented out due to exponential calculation of what should have been linear
    // matchArray.map(match => {
    //   if (match.final === true) {
    //     saveClub(match.homeClub)
    //     .then(() => {
    //       saveClub(match.awayClub);
    //     });
    //   }
    // });
  });
}

module.exports = {
  saveToDB
};