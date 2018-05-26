const mongoose = require("mongoose"),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  {save} = require("./save_function.js");

// homeClub and awayClub are filled when matchCreator() is called inside scheduleCreator()
function matchCreator(homeClub, awayClub) {
  let homeScore = 0,
    awayScore = 0,
    match = new FantasyMatch({
      _id: new mongoose.Types.ObjectId(),
      homeClub: homeClub._id,
      homeScore,
      awayClub: awayClub._id,
      awayScore,
      final: false
    });
    
  save(match);
  
  return match;
}

module.exports = {
  matchCreator
};