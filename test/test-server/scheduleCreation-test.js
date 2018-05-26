const { mongoose, chai, chaiHTTP, firstClub, secondClub, thirdClub, fourthClub, fifthClub, sixthClub } = require('../common.js'),
  { scheduleCreator } = require("../../server/programFunctions/scheduleCreation_function.js"),
  {matchCreator} = require("../../server/programFunctions/matchCreator_function.js"),
  {standingsCalculator} = require("../../server/programFunctions/standingsCalculator_function.js"),
  {basicMatchResolver} = require("../../server/programFunctions/basicMatchResolver_function.js"),
  {save} = require("../../server/programFunctions/save_function.js"),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js");

chai.use(chaiHTTP);
mongoose.Promise = Promise;

describe('Fantasy Schedule',() => {
  it('should create a match', () => {
    save(firstClub);
    save(secondClub);
    
    return matchCreator(firstClub, secondClub).should.exist;
  }).timeout(5000);
  
  it('should create a league schedule', () => {
    let clubArray = [firstClub, secondClub, thirdClub, fourthClub, fifthClub];
    
    return scheduleCreator(clubArray).should.eventually.exist;
  }).timeout(5000);
  
  it('should calculate the league standings', () => {
    return FantasyClub
      .find()
      .then(data => {
        standingsCalculator(data);
      });
  }).timeout(5000);
});