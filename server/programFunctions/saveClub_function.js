const FantasyClub = require("../../models/fantasyClub_model.js");

function saveClub(club) {
  return FantasyClub
  .findByIdAndUpdate(
    club._id,
    {
      $inc: {
        wins: club.wins,
        draws: club.draws,
        losses: club.losses,
        points: club.points,
        goalsFor: club.goalsFor,
        goalsAgainst: club.goalsAgainst,
        goalDifferential: club.goalDifferential,
        gamesPlayed: club.gamesPlayed
      }
    }
  )
  .catch(error => {
    throw new Error(error);
  });
}

module.exports = {
  saveClub
};