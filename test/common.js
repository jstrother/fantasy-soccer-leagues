const mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require('chai-as-promised'),
	should = chai.should(),
	dbTestConnection = 'mongodb://gameUser:gamePassword@ds161169.mlab.com:61169/fantasy-soccer-test';

exports.mongoose = mongoose;	
exports.chai = chai;
exports.chaiHTTP = chaiHTTP;
exports.chaiAsPromised = chaiAsPromised;
exports.should = should;
exports.dbTestConnection = dbTestConnection;