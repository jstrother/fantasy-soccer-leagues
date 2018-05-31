const mongoose = require('mongoose'),
	chai = require('chai'), // if you need expect or should, then you need to import chai also
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require("chai-as-promised"),
	should = chai.should(),
	{basicMatchResolver} = require("../../server/programFunctions/basicMatchResolver_function.js"),
	{saveMatches} = require("../../server/programFunctions/saveMatches_function.js"),
	{humanClubScoreCalc} = require("../../server/programFunctions/humanClubScoreCalc_function.js"),
	{computerClubScoreCalc} = require("../../server/programFunctions/computerClubScoreCalc_function.js"),
	{standingsStatsCalc} = require("../../server/programFunctions/standingsStatsCalc_function.js"),
  {dbTestConnection, fullSchedule, clubArray} = require("../common.js");

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
  
  it('should resolve matches that are run by human players', () => {
    const humanClubScores = humanClubScoreCalc(fullSchedule[0].matches);
    humanClubScores.should.exist;
  });
  it('should resolve matches that are run by the computer', () => {
    const computerClubScores = computerClubScoreCalc(fullSchedule[0].matches);
    computerClubScores.should.exist;
  });
  it('should resolve standings statistics for each match', () => {
    const standingsStats = standingsStatsCalc(fullSchedule[0].matches);
    standingsStats.should.exist;
  });
  it('should resolve matches that have already happened', () => {
    const resolvedMatches = basicMatchResolver(fullSchedule, clubArray);
    resolvedMatches.should.exist;
  });
  it('should add resolved matches to the database', () => {
    const savedMatches = saveMatches(basicMatchResolver(fullSchedule, clubArray));
    return savedMatches.should.eventually.exist;
  });
});