const { mongoose, chai, chaiHTTP, firstClub, secondClub, thirdClub, fourthClub, fifthClub, sixthClub } = require('../common.js'),
  { save, matchCreator, scheduleCreator, matchResolver } = require("../../server/programFunctions/scheduleCreation_function.js"),
  FantasyMatch = require("../../models/fantasyMatch_model.js");

chai.use(chaiHTTP);
mongoose.Promise = Promise;

describe('Fantasy Schedule',() => {
  it('should create a match', () => {
    save(firstClub);
    save(secondClub);
    
    return matchCreator(firstClub, secondClub).should.exist;
  });
  
  it('should create a league schedule', () => {
    let clubArray = [firstClub, secondClub, thirdClub, fourthClub, fifthClub];
    
    return scheduleCreator(clubArray).should.eventually.exist;
  });
  
  it('should resolve match outcomes', () => {
    // these test are not set up to clear from the database after each and every test, so we just tack on the rest of the clubs here and build up from the mathCreator() test above
    save(thirdClub);
    save(fourthClub);
    save(fifthClub);
    save(sixthClub);
    
    matchCreator(thirdClub, fourthClub);
    matchCreator(fifthClub, sixthClub);
    
    return FantasyMatch
      .find()
      .populate({
        path: 'homeClub awayClub',
        model: 'FantasyClub'
      })
      .then(data => {
        matchResolver(data).should.exist;
      });
  });
  
  // it('should calculate the league standings', () => {
    
  // });
});