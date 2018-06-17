/*eslint-disable no-console*/
const FantasyClub = require("../../models/fantasyClub_model.js");

async function saveClubs(club) {
  const options = {
    new: true
  };
  
  let updatedClub = await FantasyClub
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
    },
    options
  )
  .catch(error => {
    throw new Error(error);
  });
  
  return updatedClub;
}

module.exports = {
  saveClubs
};