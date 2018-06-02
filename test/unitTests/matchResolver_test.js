const mongoose = require('mongoose'),
	chai = require('chai'), // if you need expect or should, then you need to import chai also
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require("chai-as-promised"),
	should = chai.should(),
	{matchResolver} = require("../../server/programFunctions/matchResolver_function.js"),
	{saveMatches} = require("../../server/programFunctions/saveMatches_function.js"),
	{humanHomeClubScoreCalc} = require("../../server/programFunctions/humanHomeClubScoreCalc_function.js"),
	{humanAwayClubScoreCalc} = require("../../server/programFunctions/humanAwayClubScoreCalc_function.js"),
	{computerClubScoreCalc} = require("../../server/programFunctions/computerClubScoreCalc_function.js"),
	{standingsStatsCalc} = require("../../server/programFunctions/standingsStatsCalc_function.js"),
  {dbTestConnection, fullSchedule, clubArray} = require("../common.js"),
  FantasyClub = require("../../models/fantasyClub_model.js");

chai.use(chaiHTTP);
chai.use(chaiAsPromised);
mongoose.Promise = Promise;

describe('Matches Resolver', () => {
  before(() => {
    return mongoose.connect(dbTestConnection);
  });
  
  afterEach(() => {
    return mongoose.connection.db.dropDatabase(dbTestConnection);
  });
  
  after(() => {
    return mongoose.connection.close((dbTestConnection) => {
      console.log('connection closed');
    });
  });
  
  it('should resolve a matche\'s homeScore for clubs that are run by human players', () => {
    const humanHomeClubScores = humanHomeClubScoreCalc(fullSchedule[0].matches);
    humanHomeClubScores.should.exist;
    humanHomeClubScores[0].homeScore.should.equal(53);
  });
  it('should resolve a matche\'s awayScore for clubs that are run by human players', () => {
    const humanAwayClubScores = humanAwayClubScoreCalc(fullSchedule[0].matches);
    humanAwayClubScores.should.exist;
    humanAwayClubScores[0].awayScore.should.equal(67);
  });
  it.only('should resolve matches that are run by the computer', () => {
    const computerClubScores = computerClubScoreCalc(fullSchedule[0].matches);
    computerClubScores.should.exist;
    computerClubScores[1].awayScore.should.equal(58);
  });
  it('should resolve standings statistics for each match', () => {
    const standingsStats = standingsStatsCalc(fullSchedule[0].matches),
      club = standingsStats[0].awayClub;
    standingsStats.should.exist;
    club.gamesPlayed.should.equal(1);
    club.wins.should.equal(1);
    club.draws.should.equal(0);
    club.losses.should.equal(0);
    club.points.should.equal(3);
    club.goalsFor.should.equal(67);
    club.goalsAgainst.should.equal(53);
    club.goalDifferential.should.equal(14);
  });
  it('should add resolved matches to the database', () => {
    const savedMatches = saveMatches(standingsStatsCalc(fullSchedule[0].matches));
    return savedMatches.should.eventually.exist;
  });
  it('should resolve matches that have already happened', () => {
    const resolvedMatches = matchResolver(fullSchedule, clubArray),
      resolvedLength = resolvedMatches.length,
      resolvedClub = FantasyClub
                      .findOne(
                        {
                          clubName: 'Strikers \'87'
                        }
                      )
                      .catch(error => {
                        throw new Error(error);
                      });
    console.log('resolvedMatches:', resolvedMatches);
    console.log('resolvedLength:', resolvedLength);  // we use this to double-check how many test matches have been run as even the test matches have dates attached
    
    resolvedClub.should.eventually.have.property({gamesPlayed: resolvedLength});
  });
});