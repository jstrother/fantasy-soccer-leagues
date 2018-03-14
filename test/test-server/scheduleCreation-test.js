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
  
  // it('should resolve match outcomes', () => {
  //   let match1 = matchCreator(firstClub, secondClub),
  //     match2 = matchCreator(thirdClub, fourthClub),
  //     match3 = matchCreator(fifthClub, sixthClub),
  //     matchArray = [match1, match2, match3];
    
  //   FantasyMatch
  //   .find()
  //   .populate({
  //     path: 'homeClub awayClub',
  //     model: 'FantasyClub'
  //   });
    
  //   return matchResolver(matchArray).should.exist;
  // });
  
  // it('should calculate the league standings', () => {
    
  // });
});