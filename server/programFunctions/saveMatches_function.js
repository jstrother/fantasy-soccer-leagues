/*eslint-disable no-console*/
const FantasyMatch = require("../../models/fantasyMatch_model.js");

function saveMatches(resolvedMatches) {
  // console.log('resolvedMatch:', resolvedMatches[0]);
  let savedMatches = resolvedMatches.map(match => {
    return FantasyMatch
    .findByIdAndUpdate(
      match._id,
      {
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        final: match.final
      }
    )
    .then(data => {
      console.log('FantasyMatch:', data);
    })
    .catch(error => {
      throw new Error(error);
    });
  });
  // savedMatches[0]
  // .then(data => {
  //   console.log('savedMatch:', data);
  // })
  // .catch(error => {
  //   throw new Error(error);
  // });
  return Promise.all(savedMatches)
    .then(data => {
      console.log('savedMatch:', data);
    });
}

module.exports = {
  saveMatches
};