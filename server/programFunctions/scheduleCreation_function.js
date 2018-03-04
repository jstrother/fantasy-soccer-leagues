const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasySchedule = require("../../models/fantasySchedule_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js");
  
function scheduleCreator(clubArray) {
  // need to create enough matches so that each club has 38 of them and that there is only one match per club per week, matches should end up as an array of arrays
  let schedule = new FantasySchedule({
    matches: [],
    numLeagueSeasonMatches: clubArray.length * 38
  });
  
  const averageClub = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Average',
    manager: 'N/A'
  });
  
  if (clubArray.length % 2 !== 0) {
    // we do this so there is an even number of clubs in clubArray and it's score will always be equal to the average weekly score of all other clubs in clubArray
    averageClub
    .save()
    .catch(error => {
      throw new Error(error);
    });
    
    clubArray.push(averageClub);
  }
  
  while (schedule.matches.length <= schedule.numLeagueSeasonMatches) {
    arrayParser(clubArray);
  }
  
  schedule
  .save()
  .catch(error => {
    throw new Error(error);
  });
  
  return schedule;
  
  // this function goes over clubArray and sets up a match between each pair
  function arrayParser (clubArray) {
    const controlNumber = clubArray.length / 2,
      controlClub = clubArray[controlNumber];
    let weeklyMatches = [];
    
    do {
      let firstTwoClubs = clubArray.slice(0, 2),
        match = matchCreator(firstTwoClubs[0], firstTwoClubs[1]);
      
      weeklyMatches.push(match._id);
      // we take what was originally the first club in the list and move it to the end so a new set of pairs results and we don't end up making the same set of matches for each week, and also that we don't lose any clubs in the process
      let clubToEnd = clubArray.shift();
      clubArray.push(clubToEnd);
    } while (controlClub !== clubArray[0]);
    
    schedule.matches.push(weeklyMatches);
    
    return clubArray;
  }
}
  
function matchCreator(homeClub, awayClub) {
  let homeScore = 0,
    awayScore = 0,
    match = new FantasyMatch({
      _id: new mongoose.Types.ObjectId(),
      homeClub: homeClub._id,
      homeScore,
      awayClub: awayClub._id,
      awayScore
    });
    
  match.save()
  .catch(error => {
    throw new Error(error);
  });
  
  return match;
}

module.exports = {
  scheduleCreator,
  matchCreator
};