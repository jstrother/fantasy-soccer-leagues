const mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require('chai-as-promised'),
	should = chai.should(),
	dbTestConnection = 'mongodb://gameUser:gamePassword@ds137271.mlab.com:37271/fantasy-soccer-db-test',
	serverTestConnection = 'mongodb://gameUser:gamePassword@ds139761.mlab.com:39761/fantasy-soccer-server-test';

exports.mongoose = mongoose;	
exports.chai = chai;
exports.chaiHTTP = chaiHTTP;
exports.chaiAsPromised = chaiAsPromised;
exports.should = should;
exports.dbTestConnection = dbTestConnection;
exports.serverTestConnection = serverTestConnection;