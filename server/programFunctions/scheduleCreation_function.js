const express = require("express"),
  scheduleRouter = express.Router(),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasySchedule = require("../../models/fantasySchedule_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js");
  
function scheduleCreator() {
  let matchIdArray = [],
    numberMatches = matchIdArray.length,
    thisSchedule = {
      matches: matchIdArray,
      numLeagueSeasonMatches: numberMatches
    };
  
  thisSchedule.matches.push(matchId);
  
  return FantasySchedule
    .create(thisSchedule)
    .catch(error => {
      throw new Error(error);
    });
}
  
function matchCreator(matchId, homeClub, homeScore, awayClub, awayScore) {
  let thisMatch = {
    matchId,
    homeClub,
    homeScore,
    awayClub,
    awayScore
  };
  
  return FantasyMatch
    .create(thisMatch)
    .catch(error => {
      throw new Error(error);
    });
}

module.exports = {
  idCreator,
  scheduleCreator,
  matchCreator,
  scheduleRouter
};