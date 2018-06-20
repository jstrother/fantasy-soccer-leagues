const fantasyScheduleRouter = require('../../server/user-routes.js').fantasyScheduleRouter,
	{ mongoose, chai, chaiHTTP, should } = require('../common.js'),
  WeeklyMatches = require('../../models/weeklyMatches_model.js'),
  FantasyClub = require("../../models/fantasyClub_model.js"),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasySchedule = require("../../models/fantasySchedule_model.js"),
  { app } = require('../../server/server.js'),
  {fullSchedule} = require("../common.js"),
  {matchResolver} = require("../../server/programFunctions/matchResolver_function.js");

chai.use(chaiHTTP);
mongoose.Promise = Promise;

describe('Fantasy Schedule', () => {
  it('should resolve a schedule', () => {
    return chai.request(app)
    .post('/fantasySchedule/matchResolver')
    .send()
    .then(resolvedSchedule => {
      console.log('resolvedSchedule:', resolvedSchedule);
    })
    .catch(error => {
      throw new Error(error);
    });
  });
});