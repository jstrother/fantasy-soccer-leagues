const { mongoose, dbTestConnection, chai, chaiAsPromised, chaiHTTP, should } = require('../common.js'),
  { closeServer, runServer } = require('../../server/server.js'),
  WeeklyMatches = require('../../models/weeklyMatches_model.js'),
  FantasyClub = require("../../models/fantasyClub_model.js"),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasySchedule = require("../../models/fantasySchedule_model.js"),
  User = require("../../models/user_model.js"),
  {fullSchedule, managerArray, clubArray, matchesArray, weeklyArray} = require("../common.js");

mongoose.Promise = Promise;
chai.use(chaiAsPromised);

before(() => {
	return runServer(dbTestConnection, 8081)
	.then(() => {
	  managerArray.forEach(manager => {
	    User.create(manager);
	  });
	  clubArray.forEach(club => {
	    FantasyClub.create(club);
	  });
	  matchesArray.forEach(match => {
	    FantasyMatch.create(match);
	  });
	  weeklyArray.forEach(week => {
	    WeeklyMatches.create(week);
	  });
	  FantasySchedule.create(fullSchedule);
	});
});

after(() => {
  return closeServer()
  .then(() => {
    mongoose.connection.db.dropDatabase(dbTestConnection);
  });
});

describe('All Tests', function() {
  // importTest('User Routes Test', './user-routes-test.js');
  // importTest('Player Routes Test', './player-routes-test.js');
  // importTest('League Routes Test', './league-routes-test.js');
  // importTest('Schedule Creation Test', './scheduleCreation-test.js');
  importTest('Match Resolution Tests', './matchResolver_test.js');
});
	
function importTest(name, path) {
  describe(name, () => {require(path)});
}