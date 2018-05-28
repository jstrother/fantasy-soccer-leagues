const FantasyClub = require("../../models/fantasyClub_model.js");

const options = {
  new: true,
  upsert: true
};

function saveAwayClubs(resolvedMatches) {
  let awayClubs = resolvedMatches.map(match => {
    return FantasyClub
    .findByIdAndUpdate(
      match.awayClub._id,
      {
        wins: match.awayClub.wins,
        draws: match.awayClub.draws,
        losses: match.awayClub.losses,
        points: match.awayClub.points,
        goalsFor: match.awayClub.goalsFor,
        goalsAgainst: match.awayClub.goalsAgainst,
        goalDifferential: match.awayClub.goalDifferential,
        gamesPlayed: match.awayClub.gamesPlayed
      },
      options
    )
    .catch(error => {
      throw new Error(error);
    });
  });
  return Promise.all(awayClubs);
}

module.exports = {
  saveAwayClubs
};