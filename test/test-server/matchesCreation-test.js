const { mongoose, chai, chaiHTTP, should, testTeam1, testTeam2 } = require('../common.js'),
  FantasyMatch = require('../../models/fantasyMatch_model.js'),
  FantasyClub = require('../../models/fantasyClub_model.js'),
  FantasySchedule = require('../../models/fantasySchedule_model.js'),
  { app } = require('../../server/server.js');

chai.use(chaiHTTP);
mongoose.Promise = Promise;

describe('Fantasy Match',() => {
  it('should create a Fantasy Match')
});