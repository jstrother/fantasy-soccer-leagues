const mongoose = require('mongoose'),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasySchedule = require("../../models/fantasySchedule_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js"),
  WeeklyMatches = require("../../models/weeklyMatches.js");

// matchArray will be filled by getting schedule.matches from fantasySchedule-routes.js
// can use loopArray_function.js to run matchResolver() once a week on the correct index in matchArray
function matchResolver(matchArray) {
  let homeClubScore = 0,
    combinedScores = 0,
    matchArrayLength = matchArray.length / 2 - 1; // setting up these last two in case there is an averageClub in matchArray somewhere
  for (let match of matchArray) {
    console.log('match:', match);
    if (match.final === false) {
      // console.log('homeClub starters:', match.homeClub.starters);
      // console.log('homeClub manager:', match.homeClub.manager);
      // match.homeClub.starters.forEach(starter => {
      //   if (match.homeClub.clubName !== 'Average') {
      //     homeClubScore += match.homeScore.fantasyPoints.fixture;
      //     console.log('homeClubScore:', homeClubScore);
      //   }
      // });
    }
  }
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
  save,
  scheduleCreatorPromise
};