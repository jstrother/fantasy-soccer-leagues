const { mongoose, chai, chaiHTTP, chaiAsPromised, should, dbTestConnection } = require('./common.js');

describe('All Tests', function() {
		before(done => {
			mongoose.connect(dbTestConnection);
			mongoose.connection.on('connected', function() {
				console.log('connection made');
				mongoose.connection.db.dropDatabase();
				done();
			});
		});
	
		after(done => {
			mongoose.disconnect();
			mongoose.connection.on('disconnected', function() {
				console.log('disconnected');
				mongoose.connection.db.dropDatabase();
			});
			done();
		});
    importTest('Fantasy Game', './db-test.js');
});
	
function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}