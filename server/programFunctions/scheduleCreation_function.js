/* eslint-disable no-console */
const mongoose = require('mongoose'),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasySchedule = require("../../models/fantasySchedule_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js"),
  WeeklyMatches = require("../../models/weeklyMatches_model.js"),
  { compare } = require("../../server/programFunctions/compare_function.js");

function standingsCalculator(clubArray) {
  clubArray.sort((a, b) => compare(a.points, b.points) || compare(a.goalDifferential, b.goalDifferential) || compare(a.goalsFor, b.goalsFor));
  return clubArray;
}

// can use loopArray_function.js to run matchResolver() once a week on the correct index in matchArray
function matchResolver(allWeeklyMatches) {
  // it's 'allWeeklyMatches' because we are grabbing all of the weeklyMatches from the database
  const today = new Date().getTime();
  
  allWeeklyMatches.forEach(weeklyMatches => {
    let allScores = 0,
      matchArray = weeklyMatches.matches;
    if (today > weeklyMatches.datesToRun.getTime()) {
      // first calculate fantasyPoints for each team run by a human
      matchArray.forEach(match => {
        if (match.final === false) {
          if (match.homeClub.clubName !== 'Average') {
            match.homeClub.starters.forEach(starter => {
              match.homeScore += starter.fantasyPoints.fixture;
              match.homeClub.goalsFor += match.homeScore;
              match.homeClub.goalsAgainst += match.awayScore;
              match.homeClub.goalDifferential = match.homeClub.goalsFor - match.homeClub.goalsAgainst;
              allScores += match.homeScore;
              match.final = true;
            });
          }
          if (match.awayClub.clubName !== 'Average') {
            match.awayClub.starters.forEach(starter => {
              match.awayScore += starter.fantasyPoints.fixture;
              match.awayClub.goalsFor += match.awayScore;
              match.awayClub.goalsAgainst += match.homeScore;
              match.awayClub.goalDifferential = match.awayClub.goalsFor - match.awayClub.goalsAgainst;
              allScores += match.awayScore;
              match.final = true;
            });
          }
        }
      });
      // then calculate the points for averageClub if present
      matchArray.forEach(match => {
        if(match.homeClub.clubName === 'Average') {
          console.log('allScores:', allScores);
          match.homeScore = allScores / (matchArray.length - 1);
          match.homeClub.goalsFor += match.homeScore;
          match.homeClub.goalsAgainst += match.awayScore;
          match.homeClub.goalDifferential = match.homeClub.goalsFor - match.homeClub.goalsAgainst;
        }
        if(match.awayClub.clubName === 'Average') {
          match.awayScore = allScores / (matchArray.length - 1);
          match.awayClub.goalsFor += match.awayScore;
          match.awayClub.goalsAgainst += match.homeScore;
          match.awayClub.goalDifferential = match.awayClub.goalsFor - match.awayClub.goalsAgainst;
        }
      });
      // finally, compare scores and add to correct "column" (W, D, L)
      matchArray.forEach(match => {
        if (match.homeScore > match.awayScore) {
          match.homeClub.wins += 1;
          match.homeClub.points += 3;
          match.awayClub.losses += 1;
        }
        if (match.awayScore > match.homeScore) {
          match.awayClub.wins += 1;
          match.awayClub.points += 3;
          match.homeClub.losses += 1;
        }
        if (match.homeScore === match.awayScore) {
          match.homeClub.draws += 1;
          match.homeClub.points += 1;
          match.awayClub.draws += 1;
          match.awayClub.points += 1;
        }
      });
      weeklyMatches.matchesResolved = true;
    }
    save(weeklyMatches);
  });
  
  return allWeeklyMatches;
}

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
  
  const averageClub = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Average'
  });
  
  if (clubArray.length % 2 !== 0) {
    // this checks to make sure that there is only one averageClub in the clubArray
    let averageCheck = clubArray.filter(club => {
      if (club.clubName === 'Average') {
        return true;
      }
    });
    if (averageCheck.length === 0) {
      // we do this so there is an even number of clubs in clubArray and it's score will always be equal to the average weekly score of all other clubs in clubArray
      averageClub
      .save()
      .catch(error => {
        throw new Error(error);
      });
      
      clubArray.push(averageClub);
    }
  }
  
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
      matchesResolved: false,
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

function save(item) {
  return item
  .save()
  .catch(error => {
    throw new Error(error);
  });
}

module.exports = {
  scheduleCreator,
  matchCreator,
  matchResolver,
  standingsCalculator,
  save
};