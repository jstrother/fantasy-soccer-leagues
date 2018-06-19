const mongoose = require('mongoose'),
	chai = require('chai'), // if you need expect or should, then you need to import chai also
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require("chai-as-promised"),
	should = chai.should(),
	{matchResolver} = require("../../server/programFunctions/matchResolver_function.js"),
	{saveMatches} = require("../../server/programFunctions/saveMatches_function.js"),
	{saveClubs} = require("../../server/programFunctions/saveClubs_function.js"),
	{humanHomeClubScoreCalc} = require("../../server/programFunctions/humanHomeClubScoreCalc_function.js"),
	{humanAwayClubScoreCalc} = require("../../server/programFunctions/humanAwayClubScoreCalc_function.js"),
	{computerClubScoreCalc} = require("../../server/programFunctions/computerClubScoreCalc_function.js"),
	{standingsStatsCalc} = require("../../server/programFunctions/standingsStatsCalc_function.js"),
  {fullSchedule} = require("../common.js");

chai.use(chaiHTTP);
chai.use(chaiAsPromised);
mongoose.Promise = Promise;

describe('Matches Resolver', () => {
  
  it('should resolve a match\'s homeScore for clubs that are run by human players', () => {
    const humanHomeClubScores = humanHomeClubScoreCalc(fullSchedule[0].matches);
    humanHomeClubScores.should.exist;
    humanHomeClubScores[0].homeScore.should.equal(54);
  });
  it('should resolve a match\'s awayScore for clubs that are run by human players', () => {
    const humanAwayClubScores = humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches));
    humanAwayClubScores.should.exist;
    humanAwayClubScores[0].awayScore.should.equal(67);
  });
  it('should resolve a match\'s scores for clubs that are run by the computer', () => {
    const computerClubScores1 = computerClubScoreCalc(humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches)));
    computerClubScores1.should.exist;
    computerClubScores1[1].awayScore.should.equal(58); // score of club run by computer
  });
  it('should resolve standings statistics for each match', () => {
    const standingsStats = standingsStatsCalc(computerClubScoreCalc(humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches)))),
      club = standingsStats[0].awayClub;
    standingsStats.should.exist;
    club.gamesPlayed.should.equal(1);
    club.wins.should.equal(1);
    club.draws.should.equal(0);
    club.losses.should.equal(0);
    club.points.should.equal(3);
    club.goalsFor.should.equal(67);
    club.goalsAgainst.should.equal(54);
    club.goalDifferential.should.equal(13);
  });
  it('should add a club from resolved matches to the database', () => {
    const savedClub = saveClubs(computerClubScoreCalc(humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches)))[0].homeClub);
    savedClub.should.exist;
  });
  it('should add resolved matches to the database', () => {
    const savedMatches = saveMatches(standingsStatsCalc(computerClubScoreCalc(humanAwayClubScoreCalc(humanHomeClubScoreCalc(fullSchedule[0].matches)))));
    return savedMatches.should.eventually.exist;
  });
  it('should resolve matches that have already happened', (done) => {
    const resolvedSchedule = matchResolver(fullSchedule),
      scheduleLength = resolvedSchedule.length;
    resolvedSchedule.should.exist;
    scheduleLength.should.equal(38);
    done();
  });
});