const {scheduleCreator, matchResolver} = require("../../server/programFunctions/scheduleCreation_function.js"),
  {basicMatchResolver} = require("../../server/programFunctions/basicMatchResolver_function.js"),
  {save} = require("../../server/programFunctions/save_function.js"),
  {chai, chaiHTTP, should, dbTestConnection, mongoose, clubOne, clubTwo, firstManager, secondManager, firstMatch, secondMatch, thirdMatch, fourthMatch, firstWeek, secondWeek, thirdWeek, fourthWeek} = require("../common.js");

chai.use(chaiHTTP);
mongoose.Promise = Promise;

describe('Matches Resolver', () => {
  before(() => {
    return mongoose.connect(dbTestConnection, {
      useMongoClient: true
    });
  });
  
  after(() => {
    return mongoose.connection.db.dropDatabase(dbTestConnection)
    .then(() => {
      mongoose.connection.close(() => {
        console.log('connection closed');
      });
    });
  });
  
  it.only('should resolve matches that have already happened', () => {
    const fullSchedule = [firstWeek, secondWeek, thirdWeek, fourthWeek],
      clubArray = [clubOne, clubTwo];
    // console.log('fullSchedule:', fullSchedule);
    // console.log('clubArray:', clubArray);
    const resolvedMatches = basicMatchResolver(fullSchedule, clubArray);
    console.log('resolvedMatches:', resolvedMatches);
    resolvedMatches.should.exist;
  });
});