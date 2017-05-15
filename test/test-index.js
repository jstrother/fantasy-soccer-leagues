const { mongoose, chai, chaiAsPromised } = require('./common.js');

mongoose.Promise = global.Promise;
chai.use(chaiAsPromised);

describe('All Tests', function() {
    importTest('Fantasy Game', './db-test.js');
    importTest('Server Test', './server-test.js');
});
	
function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}