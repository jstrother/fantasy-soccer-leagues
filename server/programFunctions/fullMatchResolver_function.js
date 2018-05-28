const {basicMatchResolver} = require("./basicMatchResolver_function.js"),
  {saveMatches} = require("./saveMatches_function.js"),
	{saveHomeClubs} = require("../../server/programFunctions/saveHomeClubs_function.js"),
	{saveAwayClubs} = require("../../server/programFunctions/saveAwayClubs_function.js");

function fullMatchResolver(fullSchedule, clubArray) {
  saveMatches(basicMatchResolver(fullSchedule, clubArray));
  saveHomeClubs(basicMatchResolver(fullSchedule, clubArray));
  saveAwayClubs(basicMatchResolver(fullSchedule, clubArray));
}

module.exports = {
  fullMatchResolver
};