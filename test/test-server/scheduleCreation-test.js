const { mongoose, chai, chaiHTTP, should, testTeam1, testTeam2, testTeam3, testTeam4 } = require('../common.js'),
  FantasyMatch = require('../../models/fantasyMatch_model.js'),
  FantasyClub = require('../../models/fantasyClub_model.js'),
  FantasySchedule = require('../../models/fantasySchedule_model.js'),
  { app } = require('../../server/server.js'),
  { matchCreator, scheduleCreator } = require("../../server/programFunctions/scheduleCreation_function.js");

chai.use(chaiHTTP);
mongoose.Promise = Promise;

describe('Fantasy Schedule',() => {
  it('should create a Fantasy Match', () => {
    const awayScore = 0,
      homeScore = 0,
      matchId = 1;
    
    return matchCreator(matchId, testTeam1, homeScore, testTeam2, awayScore).should.eventually.exist;
  });
  
  it('should create a Fantasy Schedule', () => {
    return scheduleCreator().should.eventually.exist;
  });
});