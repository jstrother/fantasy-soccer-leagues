const mongoose = require('mongoose'),
	chai = require('chai'), // if you need expect or should, then you need to import chai also
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require("chai-as-promised"),
	should = chai.should(),
	{dbTestConnection} = require("../common.js"),
  { closeServer, runServer } = require('../../server/server.js'),
  WeeklyMatches = require('../../models/weeklyMatches_model.js'),
  FantasyClub = require("../../models/fantasyClub_model.js"),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasySchedule = require("../../models/fantasySchedule_model.js"),
  User = require("../../models/user_model.js"),
  {fullSchedule, managerArray, clubArray, matchesArray, weeklyArray} = require("../common.js");

mongoose.Promise = Promise;
chai.use(chaiAsPromised);

before(() => {
	return runServer(dbTestConnection, 8081);
});

beforeEach(() => {
  return FantasySchedule.create(fullSchedule)
  .then(() => {
    return WeeklyMatches.insertMany(weeklyArray)
    .then(() => {
      return FantasyMatch.insertMany(matchesArray)
      .then(() => {
        return FantasyClub.insertMany(clubArray)
        .then(() => {
          return User.insertMany(managerArray);
        });
      });
    });
  });
});

afterEach(() => {
  return mongoose.connection.db.dropDatabase(dbTestConnection);
});

after(() => {
  return closeServer();
});

describe('All Tests', function() {
  importTest('User Routes Test', './user-routes-test.js');
  importTest('Player Routes Test', './player-routes-test.js');
  importTest('League Routes Test', './league-routes-test.js');
  importTest('Schedule Creation Test', './scheduleCreation-test.js');
  importTest('Match Resolution Tests', './matchResolver_test.js');
});
	
function importTest(name, path) {
  describe(name, () => {require(path)});
}