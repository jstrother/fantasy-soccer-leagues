/*eslint-disable no-console*/
const FantasyMatch = require("../../models/fantasyMatch_model.js");

function saveMatches(resolvedMatches) {
  const options = {
    new: true
  };
  
  let matches = resolvedMatches.map(match => {
    return FantasyMatch
    .findByIdAndUpdate(
      match._id,
      {
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        final: match.final
      },
      options
    )
    .catch(error => {
      throw new Error(error);
    });
  });
  
  return Promise.all(matches);
}

module.exports = {
  saveMatches
};