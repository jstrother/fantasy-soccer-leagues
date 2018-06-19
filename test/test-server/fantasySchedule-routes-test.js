const fantasyScheduleRouter = require('../../server/user-routes.js').fantasyScheduleRouter,
	{ mongoose, chai, chaiHTTP, should } = require('../common.js'),
  WeeklyMatches = require('../../models/weeklyMatches_model.js'),
  FantasyClub = require("../../models/fantasyClub_model.js"),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  { app } = require('../../server/server.js'),
  {fullSchedule} = require("../common.js");

chai.use(chaiHTTP);
mongoose.Promise = Promise;

describe('Fantasy Schedule', () => {
  it('should resolve the full schedule', () => {
    return chai.request(app)
    .post('/fantasySchedule/matchResolver')
    .then(res => {
      
    })
    .catch(error => {
      throw new Error(error);
    });
  });
});