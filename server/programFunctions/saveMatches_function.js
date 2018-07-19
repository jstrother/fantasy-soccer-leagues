const FantasyMatch = require("../../models/fantasyMatch_model.js");

function saveMatches(resolvedMatches) {
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
    .catch(error => {
      throw new Error(error);
    });
  });
  
  return Promise.all(savedMatches);
}

module.exports = {
  saveMatches
};