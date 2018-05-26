const {compare} = require("./compare_function.js");

function standingsCalculator(clubArray) {
  clubArray.sort((a, b) => compare(a.points, b.points) || compare(a.goalDifferential, b.goalDifferential) || compare(a.goalsFor, b.goalsFor));
  return clubArray;
}

module.exports = {
  standingsCalculator
};