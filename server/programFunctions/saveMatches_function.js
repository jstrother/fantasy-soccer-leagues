/*eslint-disable no-console*/
const FantasyMatch = require("../../models/fantasyMatch_model.js");

function saveMatches(resolvedMatches) {
  // console.log('resolvedMatch:', resolvedMatches[0]);
  let savedMatches = resolvedMatches.map(match => {
    console.log('match:', match);
    return FantasyMatch
    .findByIdAndUpdate(
      match._id,
      {
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        final: match.final
      },
      {
        new: true
      }
    )
    .catch(error => {
      throw new Error(error);
    });
  });
  
  return Promise.all(savedMatches)
    .then(data => {
      console.log('savedMatch:', data);
    });
}

module.exports = {
  saveMatches
};