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
	{averageClubScoreCalc} = require("../../server/programFunctions/averageClubScoreCalc_function.js"),
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
        const resolvedHumanScores = [
          humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches[0])),
            humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches[1]))
          ];
        return standingsStatsCalc(computerClubScoreCalc(averageClubScoreCalc(resolvedHumanScores), resolvedHumanScores[0]));
      }).then(resolvedMatch => {
        return saveClubs(resolvedMatch.homeClub)
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
      const resolvedHumanScores = [
        humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches[0])),
          humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches[1]))
        ],
        resolvedSchedule = [
          standingsStatsCalc(computerClubScoreCalc(averageClubScoreCalc(resolvedHumanScores), resolvedHumanScores[0])),
          standingsStatsCalc(computerClubScoreCalc(averageClubScoreCalc(resolvedHumanScores), resolvedHumanScores[1]))
        ];
      return resolvedSchedule;
    })
    .then(resolvedSchedule => {
      return saveMatches(resolvedSchedule)
      .then(savedMatches => {
        return FantasyMatch
        .findById(savedMatches[0]._id)
        .then(matchFromDB => {
          matchFromDB.homeScore.should.equal(54);
          matchFromDB.awayScore.should.equal(67);
          matchFromDB.final.should.equal(true);
        });
      });
    });
  });
});