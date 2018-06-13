const { mongoose, dbTestConnection, chai, chaiAsPromised, chaiHTTP, should } = require('../common.js'),
  { closeServer, runServer, app } = require('../../server/server.js');

mongoose.Promise = Promise;
chai.use(chaiAsPromised);

before(() => {
	runServer(8081, dbTestConnection);
});

after(() => {
  mongoose.connection.dropDatabase();
  return closeServer();
});

describe('All Tests', function() {
  importTest('User Routes Test', './user-routes-test.js');
  importTest('Player Routes Test', './player-routes-test.js');
  importTest('League Routes Test', './league-routes-test.js');
  importTest('Fantasy Schedule Test', './scheduleCreation-test.js');
});
	
function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}