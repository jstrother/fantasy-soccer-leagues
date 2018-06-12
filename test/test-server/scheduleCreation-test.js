const { mongoose, chai, chaiHTTP, firstClub, secondClub, thirdClub, fourthClub, fifthClub, sixthClub } = require('../common.js'),
  {clubArrayLengthCheck} = require("../../server/programFunctions/clubArrayLengthCheck_function.js"),
  { scheduleCreator } = require("../../server/programFunctions/scheduleCreation_function.js"),
  {matchCreator} = require("../../server/programFunctions/matchCreator_function.js"),
  {standingsCalculator} = require("../../server/programFunctions/standingsCalculator_function.js"),
  {save} = require("../../server/programFunctions/save_function.js"),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js");

chai.use(chaiHTTP);
mongoose.Promise = Promise;

describe('Fantasy Schedule',() => {
  it('should create a match', () => {
    return matchCreator(firstClub, secondClub).should.exist;
  }).timeout(5000);
  
  it('should check the length of an array of clubs', () => {
    let clubArray1 = [firstClub, secondClub, thirdClub, fourthClub, fifthClub],
      clubArray2 = [firstClub, secondClub, thirdClub, fourthClub, fifthClub, sixthClub];
    
    const clubCheck1 = clubArrayLengthCheck(clubArray1),
      clubCheck2 = clubArrayLengthCheck(clubArray2);
      
    clubCheck1.length.should.equal(6);
    clubCheck2.length.should.equal(6);
  });
  
  it('should create a league schedule', () => {
    let clubArray = [firstClub, secondClub, thirdClub, fourthClub, fifthClub];
    const schedule = scheduleCreator(clubArray);
    
    return schedule.should.eventually.exist;
  }).timeout(5000);
  
  it('should calculate the league standings', () => {
    return FantasyClub
      .find()
      .then(data => {
        standingsCalculator(data);
      });
  }).timeout(5000);
});