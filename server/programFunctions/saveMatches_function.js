/*eslint-disable no-console*/
const FantasyMatch = require("../../models/fantasyMatch_model.js");

const options = {
  new: true,
  upsert: true
};

function saveMatches(resolvedMatches) {
  let matches = resolvedMatches.map(match => {
    return FantasyMatch
    .findByIdAndUpdate(
      match._id,
      {
        homeClub: match.homeClub._id,
        awayClub: match.awayClub._id,
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