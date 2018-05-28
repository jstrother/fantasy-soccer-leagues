const FantasyClub = require("../../models/fantasyClub_model.js");

const options = {
  new: true,
  upsert: true
};

function saveHomeClubs(resolvedMatches) {
  let homeClubs = resolvedMatches.map(match => {
    return FantasyClub
    .findByIdAndUpdate(
      match.homeClub._id,
      {
        wins: match.homeClub.wins,
        draws: match.homeClub.draws,
        losses: match.homeClub.losses,
        points: match.homeClub.points,
        goalsFor: match.homeClub.goalsFor,
        goalsAgainst: match.homeClub.goalsAgainst,
        goalDifferential: match.homeClub.goalDifferential,
        gamesPlayed: match.homeClub.gamesPlayed
      },
      options
    )
    .catch(error => {
      throw new Error(error);
    });
  });
  return Promise.all(homeClubs);
}

module.exports = {
  saveHomeClubs
};