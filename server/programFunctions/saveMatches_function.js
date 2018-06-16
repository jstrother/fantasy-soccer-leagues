/*eslint-disable no-console*/
const FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js");

function saveMatches(resolvedMatches) {
  let finalizedMatches = [];
  
  const options = {
    new: true
  };
  
  let matches = resolvedMatches.map(match => {
    let resolvedMatch = JSON.parse(JSON.stringify(match));
    return FantasyMatch
    .findByIdAndUpdate(
      resolvedMatch._id,
      {
        homeScore: resolvedMatch.homeScore,
        awayScore: resolvedMatch.awayScore,
        final: resolvedMatch.final
      },
      options
    )
    .catch(error => {
      throw new Error(error);
    });
  });
  
  let homeClubs = resolvedMatches.map(match => {
    let club = JSON.parse(JSON.stringify(match.homeClub));
    if (club.clubName === 'Strikers \'87') {
      console.log('saveMatches awayClub:', club);
    }
    return FantasyClub
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
  });
  
  let awayClubs = resolvedMatches.map(match => {
    let club = JSON.parse(JSON.stringify(match.awayClub));
    if (club.clubName === 'Strikers \'87') {
      console.log('saveMatches awayClub:', club);
    }
    return FantasyClub
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
  });
  
  finalizedMatches.push.apply(finalizedMatches, matches);
  finalizedMatches.push.apply(finalizedMatches, homeClubs);
  finalizedMatches.push.apply(finalizedMatches, awayClubs);
  
  return Promise.all(finalizedMatches);
}

module.exports = {
  saveMatches
};