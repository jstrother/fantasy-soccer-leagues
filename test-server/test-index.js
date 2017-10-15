const { mongoose, chai, chaiAsPromised, chaiHTTP, should } = require('./common.js');

mongoose.Promise = global.Promise;
chai.use(chaiAsPromised);

describe('All Tests', function() {
  importTest('Fantasy Game', './db-test.js');
  importTest('API Test', './api-test.js');
});
	
function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}