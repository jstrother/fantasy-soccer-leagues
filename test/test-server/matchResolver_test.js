const mongoose = require('mongoose'),
	chai = require('chai'), // if you need expect or should, then you need to import chai also
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require("chai-as-promised"),
	should = chai.should(),
  {scheduleRetriever} = require("../../server/programFunctions/scheduleRetriever_function.js"),
	{matchResolver} = require("../../server/programFunctions/matchResolver_function.js"),
	{saveMatches} = require("../../server/programFunctions/saveMatches_function.js"),
	{saveClub} = require("../../server/programFunctions/saveClub_function.js"),
	{humanHomeClubScoreCalc} = require("../../server/programFunctions/humanHomeClubScoreCalc_function.js"),
	{humanAwayClubScoreCalc} = require("../../server/programFunctions/humanAwayClubScoreCalc_function.js"),
	{computerClubScoreCalc} = require("../../server/programFunctions/computerClubScoreCalc_function.js"),
	{standingsStatsCalc} = require("../../server/programFunctions/standingsStatsCalc_function.js"),
	{averageClubScoreCalc} = require("../../server/programFunctions/averageClubScoreCalc_function.js"),
	{calculateScores} = require("../../server/programFunctions/calculateScores_function.js"),
	User = require("../../models/user_model.js"),
	FantasyClub = require("../../models/fantasyClub_model.js"),
	FantasyMatch = require("../../models/fantasyMatch_model.js"),
	WeeklyMatches = require("../../models/weeklyMatches_model.js"),
	FantasySchedule = require("../../models/fantasySchedule_model.js");

chai.use(chaiHTTP);
chai.use(chaiAsPromised);
mongoose.Promise = Promise;

describe('Matches Resolver', () => {
  const todayDate = new Date().getTime();
  it('should retrieve from the database a full fantasy schedule', () => {
    return scheduleRetriever()
    .then(schedule => {
      schedule.length.should.equal(38);
      schedule[0].matches.length.should.equal(2);
      schedule[1].matches.length.should.equal(2);
      schedule[2].matches.length.should.equal(2);
      schedule[3].matches.length.should.equal(2);
      schedule[4].matches.length.should.equal(2);
      schedule[5].matches.length.should.equal(2);
      schedule[6].matches.length.should.equal(2);
      schedule[7].matches.length.should.equal(2);
      schedule[8].matches.length.should.equal(2);
      schedule[9].matches.length.should.equal(2);
      schedule[10].matches.length.should.equal(2);
      schedule[11].matches.length.should.equal(2);
      schedule[12].matches.length.should.equal(2);
      schedule[13].matches.length.should.equal(2);
      schedule[14].matches.length.should.equal(2);
      schedule[15].matches.length.should.equal(2);
      schedule[16].matches.length.should.equal(2);
      schedule[17].matches.length.should.equal(2);
      schedule[18].matches.length.should.equal(2);
      schedule[19].matches.length.should.equal(2);
      schedule[20].matches.length.should.equal(2);
      schedule[21].matches.length.should.equal(2);
      schedule[22].matches.length.should.equal(2);
      schedule[23].matches.length.should.equal(2);
      schedule[24].matches.length.should.equal(2);
      schedule[25].matches.length.should.equal(2);
      schedule[26].matches.length.should.equal(2);
      schedule[27].matches.length.should.equal(2);
      schedule[28].matches.length.should.equal(2);
      schedule[29].matches.length.should.equal(2);
      schedule[30].matches.length.should.equal(2);
      schedule[31].matches.length.should.equal(2);
      schedule[32].matches.length.should.equal(2);
      schedule[33].matches.length.should.equal(2);
      schedule[34].matches.length.should.equal(2);
      schedule[35].matches.length.should.equal(2);
      schedule[36].matches.length.should.equal(2);
      schedule[37].matches.length.should.equal(2);
    });
  });
  
  it('should resolve a schedule', () => {
    return scheduleRetriever()
    .then(schedule => {
      const resolvedSchedule = matchResolver(schedule),
        firstMatch = resolvedSchedule[0].matches[0],
        firstHomeClub = firstMatch.homeClub,
        firstAwayClub = firstMatch.awayClub;
      
      resolvedSchedule.length.should.equal(38);
      
      firstMatch.homeScore.should.equal(54);
      firstMatch.awayScore.should.equal(67);
      firstMatch.final.should.equal(true);
      
      firstHomeClub.wins.should.equal(0);
      firstHomeClub.draws.should.equal(0);
      firstHomeClub.losses.should.equal(1);
      firstHomeClub.points.should.equal(0);
      firstHomeClub.goalsFor.should.equal(54);
      firstHomeClub.goalsAgainst.should.equal(67);
      firstHomeClub.goalDifferential.should.equal(-13);
      firstHomeClub.gamesPlayed.should.equal(1);
      
      firstAwayClub.wins.should.equal(1);
      firstAwayClub.draws.should.equal(0);
      firstAwayClub.losses.should.equal(0);
      firstAwayClub.points.should.equal(3);
      firstAwayClub.goalsFor.should.equal(67);
      firstAwayClub.goalsAgainst.should.equal(54);
      firstAwayClub.goalDifferential.should.equal(13);
      firstAwayClub.gamesPlayed.should.equal(1);
    });
  });
  
  it('should resolve a match\'s homeScore for clubs that are run by human players', () => {
    return scheduleRetriever()
    .then(fullSchedule => {
      const homeClubScore = humanHomeClubScoreCalc(fullSchedule[0].matches[0]);
      homeClubScore.homeScore.should.equal(54);
    });
  });
  
  it('should resolve a match\'s awayScore for clubs that are run by human players', () => {
    return scheduleRetriever()
    .then(fullSchedule => {
      const awayClubScore = humanAwayClubScoreCalc(fullSchedule[0].matches[0]);
      awayClubScore.awayScore.should.equal(67);
    });
  });
  
  it('should calculate the score for a club run by the computer', () => {
    const matchArray = [
        {
          homeScore: 54,
          awayScore: 67,
          homeClub: {
            clubName: 'Strikers \'87'
          },
          awayClub: {
            clubName: 'Team RamRod'
          }
        },
        {
          homeScore: 54,
          awayScore: 0,
          homeClub: {
            clubName: 'ThunderTurtleUnited'
          },
          awayClub: {
            clubName: 'Average'
          }
        }
      ],
      averageClubScore = averageClubScoreCalc(matchArray);
    averageClubScore.should.equal(58);
  });
  
  it('should resolve a match\'s scores for clubs that are run by the computer', () => {
    return scheduleRetriever()
    .then(fullSchedule => {
      const resolvedHumanScores = [
        humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches[0])),
          humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches[1]))
        ],
        computerClubScore = computerClubScoreCalc(averageClubScoreCalc(resolvedHumanScores), resolvedHumanScores[1]);
      computerClubScore.awayScore.should.equal(58); // this should be the computer club
    });
  });
  
  it('should resolve standings statistics for a match', () => {
    return scheduleRetriever()
    .then(fullSchedule => {
      const resolvedHumanScores = [
        humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches[0])),
          humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches[1]))
        ],
        standingsStats = standingsStatsCalc(computerClubScoreCalc(averageClubScoreCalc(resolvedHumanScores), resolvedHumanScores[0])),
        firstHomeClub = standingsStats.homeClub,
        firstAwayClub = standingsStats.awayClub;
        
      firstHomeClub.wins.should.equal(0);
      firstHomeClub.draws.should.equal(0);
      firstHomeClub.losses.should.equal(1);
      firstHomeClub.points.should.equal(0);
      firstHomeClub.goalsFor.should.equal(54);
      firstHomeClub.goalsAgainst.should.equal(67);
      firstHomeClub.goalDifferential.should.equal(-13);
      firstHomeClub.gamesPlayed.should.equal(1);
      
      firstAwayClub.wins.should.equal(1);
      firstAwayClub.draws.should.equal(0);
      firstAwayClub.losses.should.equal(0);
      firstAwayClub.points.should.equal(3);
      firstAwayClub.goalsFor.should.equal(67);
      firstAwayClub.goalsAgainst.should.equal(54);
      firstAwayClub.goalDifferential.should.equal(13);
      firstAwayClub.gamesPlayed.should.equal(1);
    });
  });
  
  it('should resolve a week\'s worth of matches', () => {
    return scheduleRetriever()
    .then(fullSchedule => {
      const week1Matches = calculateScores(fullSchedule[0]),
        week1Match1 = week1Matches.matches[0],
        week1Match2 = week1Matches.matches[1],
        week2Matches = calculateScores(fullSchedule[1]),
        week2Match1 = week2Matches.matches[0],
        week2Match2 = week2Matches.matches[1],
        week18Matches = calculateScores(fullSchedule[17]),
        week18Match1 = week18Matches.matches[0],
        week18Match2 = week18Matches.matches[1];
      
      week1Match1.homeScore.should.equal(54);
      week1Match1.awayScore.should.equal(67);
      week1Match1.final.should.equal(true);
      
      week1Match2.homeScore.should.equal(54);
      week1Match2.awayScore.should.equal(58);
      week1Match2.final.should.equal(true);
      
      week2Match1.homeScore.should.equal(67);
      week2Match1.awayScore.should.equal(54);
      week2Match1.final.should.equal(true);
      
      week2Match2.homeScore.should.equal(58);
      week2Match2.awayScore.should.equal(54);
      week2Match2.final.should.equal(true);
      
      week18Match1.homeScore.should.equal(54);
      week18Match1.awayScore.should.equal(54);
      week18Match1.final.should.equal(true);
      
      week18Match2.homeScore.should.equal(58);
      week18Match2.awayScore.should.equal(67);
      week18Match2.final.should.equal(true);
    });
  });
  
  it.skip('should resolve a club\'s full season correctly', () => {
    return scheduleRetriever()
    .then(fullSchedule => {
      const resolvedSchedule = matchResolver(fullSchedule),
        resolvedClub = resolvedSchedule[37].matches[1].awayClub;
      
      resolvedSchedule.forEach(week => {
        week.matches.forEach(match => {
          if (match.homeClub.clubName === 'Strikers \'87') {
            console.log(`Week ${week.roundNumber}:`);
            console.log('home club:', match.homeClub);
            console.log('goalsFor:', match.homeClub.goalsFor);
            console.log('goalsAgainst:', match.homeClub.goalsAgainst);
            console.log('goalDifferential:', match.homeClub.goalDifferential);
            console.log('wins:', match.homeClub.wins);
            console.log('draws:', match.homeClub.draws);
            console.log('losses:', match.homeClub.losses);
            console.log('points:', match.homeClub.points);
            console.log('gamesPlayed:', match.homeClub.gamesPlayed);
            console.log('');
          }
          if (match.awayClub.clubName === 'Strikers \'87') {
            console.log(`Week ${week.roundNumber}:`);
            console.log('away club:', match.awayClub);
            console.log('goalsFor:', match.awayClub.goalsFor);
            console.log('goalsAgainst:', match.awayClub.goalsAgainst);
            console.log('goalDifferential:', match.awayClub.goalDifferential);
            console.log('wins:', match.awayClub.wins);
            console.log('draws:', match.awayClub.draws);
            console.log('losses:', match.awayClub.losses);
            console.log('points:', match.awayClub.points);
            console.log('gamesPlayed:', match.awayClub.gamesPlayed);
            console.log('');
          }
        });
      });
      
      resolvedClub.goalsFor.should.equal(2052);
      resolvedClub.goalsAgainst.should.equal(2273);
      resolvedClub.goalDifferential.should.equal(-221);
      resolvedClub.wins.should.equal(0);
      resolvedClub.draws.should.equal(13);
      resolvedClub.losses.should.equal(25);
      resolvedClub.points.should.equal(13);
      resolvedClub.gamesPlayed.should.equal(38);
    });
  });
  
  it.only('should add a club from resolved matches to the database', () => {
    return scheduleRetriever()
      .then(fullSchedule => {
        return matchResolver(fullSchedule);
      }).then(resolvedSchedule => {
        const testClubId = resolvedSchedule[0].matches[0].homeClub._id;
        
        let savedClubs = [];
        console.log('test club:', resolvedSchedule[0].matches[0].homeClub);
        console.log('schedule length:', resolvedSchedule.length);
        resolvedSchedule.forEach(week => {
          // console.log('week number:', week.roundNumber);
          week.matches.forEach(match => {
            if (match.homeClub._id === testClubId) {
              // console.log('home club:', match.homeClub.clubName);
              savedClubs.push(saveClub(match.homeClub));
            }
            if (match.awayClub._id === testClubId) {
              // console.log('away club:', match.awayClub.clubName);
              savedClubs.push(saveClub(match.awayClub));
            }
          });
        });
        
        return Promise.all(savedClubs)
        .then(() => {
          return FantasyClub
          .findById(testClubId)
          .then(clubFromDB => {
            // console.log('clubFromDB:', clubFromDB);
            clubFromDB.should.exist;
            clubFromDB.wins.should.equal(0);
            clubFromDB.draws.should.equal(12);
            clubFromDB.losses.should.equal(26);
            clubFromDB.points.should.equal(12);
            clubFromDB.goalsFor.should.equal(2052);
            clubFromDB.goalsAgainst.should.equal(2273);
            clubFromDB.goalDifferential.should.equal(-221);
            clubFromDB.gamesPlayed.should.equal(38);
          })
          .catch(error => {
            throw new Error(error);
          });
        });
      });
  });
  
  it('should add resolved matches to the database', () => {
    return scheduleRetriever()
    .then(fullSchedule => {
      return matchResolver(fullSchedule);
    })
    .then(resolvedSchedule => {
      const week38Matches = resolvedSchedule[37].matches;
      return saveMatches(week38Matches)
      .then(savedMatches => {
        const firstSavedMatch = savedMatches[0],
          secondSavedMatch = savedMatches[1];
        
        return FantasyMatch
        .findById(firstSavedMatch._id)
        .then(match1FromDB => {
          match1FromDB.should.exist;
          match1FromDB.homeScore.should.equal(67);
          match1FromDB.awayScore.should.equal(54);
          match1FromDB.final.should.equal(true);
        })
        .then(() => {
          return FantasyMatch
          .findById(secondSavedMatch._id)
          .then(match2FromDB => {
            match2FromDB.should.exist;
            match2FromDB.homeScore.should.equal(58);
            match2FromDB.awayScore.should.equal(54);
            match2FromDB.final.should.equal(true);
          });
        });
      });
    });
  });
});