const mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require('chai-as-promised'),
	should = chai.should(),
	dbUser = 'gameUser',
	dbPassword = 'gamePassword',
	dbTestConnection = `mongodb://${dbUser}:${dbPassword}@ds137271.mlab.com:37271/fantasy-soccer-db-test`,
	apiTestConnection = `mongodb://${dbUser}:${dbPassword}@ds143071.mlab.com:43071/fantasy-soccer-api-test`;

exports.mongoose = mongoose;	
exports.chai = chai;
exports.chaiHTTP = chaiHTTP;
exports.chaiAsPromised = chaiAsPromised;
exports.should = should;
exports.dbTestConnection = dbTestConnection;
exports.apiTestConnection = apiTestConnection;