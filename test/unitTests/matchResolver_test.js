const {scheduleCreator, matchResolver} = require("../../server/programFunctions/scheduleCreation_function.js"),
  {pureMatchResolver} = require("../../server/programFunctions/pureMatchResolver_function.js"),
  {save} = require("../../server/programFunctions/save_function.js"),
  {chai, chaiHTTP, dbTestConnection, mongoose, firstClub, secondClub, firstManager, secondManager, firstMatch, secondMatch, thirdMatch, fourthMatch, firstWeek, secondWeek, thirdWeek, fourthWeek} = require("../common.js");

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
  
  it.skip('should resolve matches that have already happened 1', () => {
    Promise.all([
      save(firstManager),
      save(secondManager),
      save(firstClub),
      save(secondClub)
    ])
    .then(() => {
      const clubArray = [firstClub, secondClub];
      scheduleCreator(clubArray)
      .then((schedule) => {
        console.log('schedule:', schedule);
        // matchResolver(schedule.weeklyMatches, clubArray);
      });
    })
    .catch(error => {
      throw new Error(error);
    });
  });
  
  it.only('should resolve matches that have already happened 2', () => {
    Promise.all([
      save(firstManager),
      save(secondManager),
      save(firstClub),
      save(secondClub)
    ])
    .then(() => {
      const clubArray = [firstClub, secondClub];
      scheduleCreator(clubArray)
      .then((schedule) => {
        console.log('schedule:', schedule);
        pureMatchResolver(schedule.weeklyMatches, clubArray);
      });
    });
  });
});