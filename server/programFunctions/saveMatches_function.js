/*eslint-disable no-console*/
const FantasyMatch = require("../../models/fantasyMatch_model.js");

const options = {
  new: true,
  upsert: true
};

function saveMatches(resolvedMatches) {
  console.log('saveMatches length:', resolvedMatches.length);
  let savedMatches = [];
  resolvedMatches.forEach(match => {
    FantasyMatch
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
    .then(savedMatch => {
      savedMatches.push(savedMatch);
    })
    .catch(error => {
      throw new Error(error);
    });
  });
  return savedMatches;
}

module.exports = {
  saveMatches
};