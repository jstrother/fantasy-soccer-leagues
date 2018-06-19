/*eslint-disable no-console*/
const FantasyClub = require("../../models/fantasyClub_model.js");

function saveClubs(club) {
  
  let savedClub = FantasyClub
  .findByIdAndUpdate(
    club._id,
    {
      wins: club.wins,
      draws: club.draws,
      losses: club.losses,
      points: club.points,
      goalsFor: club.goalsFor,
      goalsAgainst: club.goalsAgainst,
      goalDifferential: club.goalDifferential,
      gamesPlayed: club.gamesPlayed
    }
  )
  .catch(error => {
    throw new Error(error);
  });
  
  return savedClub;
}

module.exports = {
  saveClubs
};