/*eslint-disable no-console*/
const FantasyClub = require("../../models/fantasyClub_model.js");

async function saveClubs(club) {
  // console.log('saveClubs club:', club);
  try {
    let savedClub = await FantasyClub
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
    );
    
    console.log('savedClub:', savedClub);
    return savedClub;
  }
  catch(error) {
    throw new Error(error);
  }
}

module.exports = {
  saveClubs
};