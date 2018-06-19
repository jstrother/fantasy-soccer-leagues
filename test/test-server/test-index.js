const { mongoose, dbTestConnection, chai, chaiAsPromised, chaiHTTP, should } = require('../common.js'),
  { closeServer, runServer, app } = require('../../server/server.js');

mongoose.Promise = Promise;
chai.use(chaiAsPromised);

before(() => {
	runServer(dbTestConnection);
});

after(() => {
  // mongoose.connection.db.dropDatabase(dbTestConnection);
  closeServer();
});

describe('All Tests', function() {
  // importTest('User Routes Test', './user-routes-test.js');
  // importTest('Player Routes Test', './player-routes-test.js');
  // importTest('League Routes Test', './league-routes-test.js');
  // importTest('Schedule Creation Test', './scheduleCreation-test.js');
  // importTest('Match Resolution Tests', './matchResolver_test.js');
  importTest('Fantasy Schedule Routes Test', './fantasySchedule-routes-test.js');
});
	
function importTest(name, path) {
  describe(name, () => {require(path)});
}