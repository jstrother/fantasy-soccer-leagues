/*eslint-disable no-console*/
const FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js");

const options = {
  new: true,
  upsert: true
}; // delete these lines after testing

function saveMatches(resolvedMatches) {
  let finalizedMatches = [];
  let matches = resolvedMatches.map(match => {
    return FantasyMatch
    .findByIdAndUpdate(
      match._id,
      {
        homeClub: match.homeClub._id, // delete these lines after testing
        awayClub: match.awayClub._id, // delete these lines after testing
        homeClubName: match.homeClub.clubName, // delete these lines after testing
        awayClubName: match.awayClub.clubName, // delete these lines after testing
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        final: match.final
      },
      options // delete these lines after testing
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
        clubName: match.homeClub.clubName, // delete these lines after testing
        wins: match.homeClub.wins,
        draws: match.homeClub.draws,
        losses: match.homeClub.losses,
        points: match.homeClub.points,
        goalsFor: match.homeClub.goalsFor,
        goalsAgainst: match.homeClub.goalsAgainst,
        goalDifferential: match.homeClub.goalDifferential,
        gamesPlayed: match.homeClub.gamesPlayed
      },
      options // delete these lines after testing
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
        clubName: match.awayClub.clubName, // delete these lines after testing
        wins: match.awayClub.wins,
        draws: match.awayClub.draws,
        losses: match.awayClub.losses,
        points: match.awayClub.points,
        goalsFor: match.awayClub.goalsFor,
        goalsAgainst: match.awayClub.goalsAgainst,
        goalDifferential: match.awayClub.goalDifferential,
        gamesPlayed: match.awayClub.gamesPlayed
      },
      options // delete these lines after testing
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