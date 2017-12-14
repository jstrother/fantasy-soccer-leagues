const { mongoose, chai, chaiAsPromised, chaiHTTP, should } = require('../common.js'),
  { closeServer, runServer, app } = require('../../server/server.js');

mongoose.Promise = Promise;
chai.use(chaiAsPromised);

describe('All Tests', function() {
  // importTest('Fantasy Game', './db-test.js');
  // importTest('User Routes Test', './user-routes-test.js');
  importTest('Player Routes Test', './player-routes-test.js');
});
	
function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}