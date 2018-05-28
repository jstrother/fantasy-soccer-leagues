const {basicMatchResolver} = require("./basicMatchResolver_function.js"),
  {saveMatches} = require("./saveMatches_function.js");

function fullMatchResolver(fullSchedule, clubArray) {
  return saveMatches(basicMatchResolver(fullSchedule, clubArray));
}

module.exports = {
  fullMatchResolver
};