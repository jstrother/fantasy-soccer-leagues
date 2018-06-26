/* eslint-disable no-console */
const mongoose = require('mongoose'),
  FantasySchedule = require("../../models/fantasySchedule_model.js"),
  WeeklyMatches = require("../../models/weeklyMatches_model.js"),
  {matchCreator} = require("./matchCreator_function.js"),
  {clubArrayLengthCheck} = require("./clubArrayLengthCheck_function.js"),
  {save} = require("./save_function.js");

// clubArray will be filled by getting all clubs from fantasyClubs-router.js
// can use loopArray_function.js to run scheduleCreator() once a year
function scheduleCreator(clubArray) {
  const today = new Date(),
    year = today.getUTCFullYear(),
    startDate = new Date().setUTCFullYear(year, 2, 1),
    numberOfWeeks = 38;
  let schedule = new FantasySchedule({
    weeklyMatches: [],
    startDate // sets season start to March 1st every year, but this should in reality be pulled from API once I can afford to get it going again
  });
  
  clubArrayLengthCheck(clubArray);
  
  // we do this so each club can be associated with a schedule to make record tracking easier
  clubArray.forEach(club => {
    club.leagueScheduleId = schedule._id;
    club.save();
  });
  
  arrayParser(clubArray, schedule.weeklyMatches.length);
  
  schedule.markModified('startDate');
  return save(schedule)
  .catch(error => {
    throw new Error(error);
  });
  
  // this function goes over clubArray and sets up a match between each pair
  function arrayParser (clubArray, roundNumber) {
    const controlClub = clubArray[clubArray.length / 2], // selects the club halfway down the array
      sevenDays = 1000 * 60 * 60 * 24 * 7 * roundNumber; // number of milliseconds of each weekly set of matches up to 38
    let weeklyMatches = new WeeklyMatches({
      _id: new mongoose.Types.ObjectId(),
      roundNumber: roundNumber + 1, // roundNumber starts at 0, rounds in real life start at 1
      matches: [],
      datesToRun: new Date().setTime(schedule.startDate.getTime() + sevenDays)
    });
    
    schedule.weeklyMatches.push(weeklyMatches._id);
    
    do {
      let firstTwoClubs = clubArray.slice(0, 2),
        match = matchCreator(firstTwoClubs[0], firstTwoClubs[1]);
        
      weeklyMatches.matches.push(match._id);
      // we take what was originally the first club in the list and move it to the end so a new set of pairs results and we don't end up making the same set of matches for each week, and also that we don't lose any clubs in the process
      let clubToEnd = clubArray.shift();
      clubArray.push(clubToEnd);
    } while (controlClub !== clubArray[0]);
    
    weeklyMatches.markModified('datesToRun');
    save(weeklyMatches);
    
    if (schedule.weeklyMatches.length < numberOfWeeks) {
      arrayParser(clubArray, schedule.weeklyMatches.length);
    }
    return;
  }
}

module.exports = {
  scheduleCreator
};