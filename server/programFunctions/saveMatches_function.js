/*eslint-disable no-console*/
const FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js");

function saveMatches(resolvedMatches) {
  let finalizedMatches = [];
  
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
  
  finalizedMatches.push.apply(finalizedMatches, matches);
  finalizedMatches.push.apply(finalizedMatches, homeClubs);
  finalizedMatches.push.apply(finalizedMatches, awayClubs);
  
  return Promise.all(finalizedMatches);
}

module.exports = {
  saveMatches
};