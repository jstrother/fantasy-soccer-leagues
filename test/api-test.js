const 
    // import common modules
    { mongoose, apiTestConnection } = require('./common.js'),
    // import api functions
    { scheduleGrabber } = require('../api_functions.js');

before(done => {
	mongoose.connect(apiTestConnection);
	mongoose.connection.on('connected', () => {
		console.log('connection made to apiTestConnection');
		mongoose.connection.db.dropDatabase();
	});
	done();
});

after(done => {
	mongoose.disconnect();
	mongoose.connection.on('disconnected', () => {
		console.log('disconnected from apiTestConnection');
		mongoose.connection.db.dropDatabase();
	});
	done();
});
	
describe('MLS Schedule', () => {
    it('should retrieve current MLS schedule', () => {
	    const roundId = 117;
	    return scheduleGrabber(roundId)
	    .then((schedule) => {
		  	schedule.should.be.an.object;
			})
			.catch(error => {
				console.log(`error: ${error}`);
			});
    });
});