const mongoose = require('mongoose'),
	chai = require('chai'), // if you need expect or should, then you need to import chai also
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require("chai-as-promised"),
	should = chai.should(),
  {scheduleRetriever} = require("../../server/programFunctions/scheduleRetriever_function.js"),
	{matchResolver} = require("../../server/programFunctions/matchResolver_function.js"),
	{saveMatches} = require("../../server/programFunctions/saveMatches_function.js"),
	{saveClubs} = require("../../server/programFunctions/saveClubs_function.js"),
	{humanHomeClubScoreCalc} = require("../../server/programFunctions/humanHomeClubScoreCalc_function.js"),
	{humanAwayClubScoreCalc} = require("../../server/programFunctions/humanAwayClubScoreCalc_function.js"),
	{computerClubScoreCalc} = require("../../server/programFunctions/computerClubScoreCalc_function.js"),
	{standingsStatsCalc} = require("../../server/programFunctions/standingsStatsCalc_function.js"),
	User = require("../../models/user_model.js"),
	FantasyClub = require("../../models/fantasyClub_model.js"),
	FantasyMatch = require("../../models/fantasyMatch_model.js"),
	WeeklyMatches = require("../../models/weeklyMatches_model.js"),
	FantasySchedule = require("../../models/fantasySchedule_model.js");

chai.use(chaiHTTP);
chai.use(chaiAsPromised);
mongoose.Promise = Promise;

describe('Matches Resolver', () => {
  
  // it('should retrieve from the database a full fantasy schedule', () => {
  //   const retrievedSchedule = scheduleRetriever();
  //   retrievedSchedule.should.exist;
  //   console.log('retrievedSchedule:', retrievedSchedule);
  // });
  
  // it('should resolve a schedule', () => {
  //   const resolvedSchedule = matchResolver(scheduleRetriever());
  //   resolvedSchedule.should.exist;
  //   console.log('resolvedSchedule:', resolvedSchedule);
  // });
  
  // it('should resolve a match\'s homeScore for clubs that are run by human players', () => {
  //   const humanHomeClubScores = humanHomeClubScoreCalc(fullSchedule[0].matches);
  //   humanHomeClubScores.should.exist;
  //   humanHomeClubScores[0].homeScore.should.equal(54);
  // });
  
  // it('should resolve a match\'s awayScore for clubs that are run by human players', () => {
  //   const humanAwayClubScores = humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches));
  //   humanAwayClubScores.should.exist;
  //   humanAwayClubScores[0].awayScore.should.equal(67);
  // });
  
  // it('should resolve a match\'s scores for clubs that are run by the computer', () => {
  //   const computerClubScores1 = computerClubScoreCalc(humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches)));
  //   computerClubScores1.should.exist;
  //   computerClubScores1[1].awayScore.should.equal(58); // score of club run by computer
  // });
  
  // it('should resolve standings statistics for each match', () => {
  //   const standingsStats = standingsStatsCalc(computerClubScoreCalc(humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches)))),
  //     club = standingsStats[0].awayClub;
  //   standingsStats.should.exist;
  //   club.gamesPlayed.should.equal(1);
  //   club.wins.should.equal(1);
  //   club.draws.should.equal(0);
  //   club.losses.should.equal(0);
  //   club.points.should.equal(3);
  //   club.goalsFor.should.equal(67);
  //   club.goalsAgainst.should.equal(54);
  //   club.goalDifferential.should.equal(13);
  // });
  
  it('should add a club from resolved matches to the database', () => {
    return WeeklyMatches
      .find()
      .populate({
        path: 'matches',
        model: 'FantasyMatch',
        populate: {
          path: 'homeClub awayClub',
          model: 'FantasyClub'
        }
      })
      .then(fullSchedule => {
        return standingsStatsCalc(computerClubScoreCalc(humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches))));
      }).then(resolvedSchedule => {
        return saveClubs(resolvedSchedule[0].homeClub)
        .then(savedClub => {
          return FantasyClub
          .findById(savedClub._id)
          .then(clubFromDB => {
            clubFromDB.should.exist;
            clubFromDB.wins.should.equal(0);
            clubFromDB.draws.should.equal(0);
            clubFromDB.losses.should.equal(1);
            clubFromDB.points.should.equal(0);
            clubFromDB.goalsFor.should.equal(54);
            clubFromDB.goalsAgainst.should.equal(67);
            clubFromDB.goalDifferential.should.equal(-13);
            clubFromDB.gamesPlayed.should.equal(1);
          });
        });
      });
  });
  
  it('should add resolved matches to the database', () => {
    return WeeklyMatches
    .find()
    .populate({
      path: 'matches',
      model: 'FantasyMatch',
      populate: {
        path: 'homeClub awayClub',
        model: 'FantasyClub'
      }
    })
    .then(fullSchedule => {
      return standingsStatsCalc(computerClubScoreCalc(humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches))));
    })
    .then(resolvedSchedule => {
      return saveMatches(resolvedSchedule)
      .then(savedMatches => {
        return FantasyMatch
        .findById(savedMatches[0]._id)
        .then(matchFromDB => {
          matchFromDB.should.exist;
          matchFromDB.homeScore.should.equal(54);
          matchFromDB.awayScore.should.equal(67);
          matchFromDB.final.should.equal(true);
        });
      });
    });
  });
  
  it('should resolve matches that have already happened', () => {
    return WeeklyMatches
    .find()
    .populate({
      path: 'matches',
      model: 'FantasyMatch',
      populate: {
        path: 'homeClub awayClub',
        model: 'FantasyClub'
      }
    })
    .then(fullSchedule => {
      return matchResolver(fullSchedule);
    })
    .then(resolvedSchedule => {
      return FantasySchedule
      .find()
      .populate({
        path: 'weeklyMatches',
        model: 'WeeklyMatches',
        populate: {
          path: 'matches',
          model: 'FantasyMatch',
          populate: {
            path: 'homeClub awayClub',
            model: 'FantasyClub'
          }
        }
      })
      .then(resolvedSchedule => {
        console.log('resolvedSchedule:', resolvedSchedule[0].weeklyMatches[0].matches[0]);
        const firstMatch = resolvedSchedule[0].weeklyMatches[0].matches[0],
          firstHomeClub = firstMatch.homeClub,
          firstAwayClub = firstMatch.awayClub,
          secondMatch = resolvedSchedule[0].weeklyMatches[0].matches[1];
        
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
        
        secondMatch.homeScore.should.equal(54);
        secondMatch.awayScore.should.equal(58);
        secondMatch.final.should.equal(true);
      });
    });
  });
});