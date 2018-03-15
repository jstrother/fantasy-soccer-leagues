const mongoose = require('mongoose'),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasySchedule = require("../../models/fantasySchedule_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js"),
  WeeklyMatches = require("../../models/weeklyMatches.js");

function standingsCalculator(clubArray) {
  clubArray.sort((a, b) => compare(a.points, b.points) || compare(a.goalDifferential, b.goalDifferential) || compare(a.goalsFor, b.goalsFor));
  return clubArray;
  
  function compare(a, b) {
    if(a < b) {
      return 1;
    }
    if(a > b) {
      return -1;
    }
    if( a === b) {
      return 0;
    }
  }
}

// matchArray will be filled by getting schedule.matches.weeklyMatches from fantasySchedule-routes.js
// can use loopArray_function.js to run matchResolver() once a week on the correct index in matchArray
function matchResolver(matchArray) {
  let allScores = 0,
    counter = 0;
  // first calculate fantasyPoints for each team run by a human
  matchArray.forEach(match => {
    if (match.final === false) {
      if (match.homeClub.clubName !== 'Average') {
        match.homeClub.starters.forEach(starter => {
          match.homeScore += starter.fantasyPoints.fixture;
          counter++;
        });
      }
      if (match.awayClub.clubName !== 'Average') {
        match.awayClub.starters.forEach(starter => {
          match.awayScore += starter.fantasyPoints.fixture;
          counter++;
        });
      }
      match.final = true;
      
      match.homeClub.goalsFor += match.homeScore;
      match.homeClub.goalsAgainst += match.awayScore;
      match.homeClub.goalDifferential = match.homeClub.goalsFor - match.homeClub.goalsAgainst;
      allScores += match.homeScore;
      
      match.awayClub.goalsFor += match.awayScore;
      match.awayClub.goalsAgainst += match.homeScore;
      match.awayClub.goalDifferential = match.awayClub.goalsFor - match.awayClub.goalsAgainst;
      allScores += match.awayScore;
    }
  });
  // then calculate the points for averageClub if present
  matchArray.forEach(match => {
    if(match.homeClub.clubName === 'Average') {
      match.homeScore = allScores / counter;
    }
    if(match.awayClub.clubName === 'Average') {
      match.awayScore = allScores / counter;
    }
  });
  // finally, compare scores and add 1 to correct "column" (W, D, L)
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
  
  return matchArray;
}

// clubArray will be filled by getting all clubs from fantasyClubs-router.js
// can use loopArray_function.js to run scheduleCreator() once a year
function scheduleCreator(clubArray) {
  let schedule = new FantasySchedule({
    weeklyMatches: []
  }),
  numberOfWeeks = 38;
  
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
  
  arrayParser(clubArray, schedule.weeklyMatches.length);
  
  return save(schedule)
    .catch(error => {
      throw new Error(error);
    });
  
  // this function goes over clubArray and sets up a match between each pair
  function arrayParser (clubArray, roundNumber) {
    const controlNumber = clubArray.length / 2,
      controlClub = clubArray[controlNumber];
    let weeklyMatches = new WeeklyMatches({
      _id: new mongoose.Types.ObjectId(),
      name: `Round ${roundNumber + 1}`,
      matches: []
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

const scheduleCreatorPromise = (clubArray, error) => {
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    }
    resolve(scheduleCreator(clubArray));
  });
};

module.exports = {
  scheduleCreator,
  matchCreator,
  matchResolver,
  standingsCalculator,
  save,
  scheduleCreatorPromise
};