const { mongoose, chai, chaiHTTP, should } = require('../common.js'),
  FantasyMatch = require('../../models/fantasyMatch_model.js'),
  FantasyClub = require('../../models/fantasyClub_model.js'),
  FantasySchedule = require('../../models/fantasySchedule_model.js'),
  { app } = require('../../server/server.js'),
  { matchCreator, scheduleCreator } = require("../../server/programFunctions/scheduleCreation_function.js");

chai.use(chaiHTTP);
mongoose.Promise = Promise;

describe('Fantasy Schedule',() => {
  it('should create a match', () => {
    const firstClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      clubName: 'Strikers \'87',
      manager: 'Jim Strother'
    }),
    
    secondClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      clubName: 'Team RamRod',
      manager: 'Daniel Mayberry'
    });
    
    return matchCreator(firstClub, secondClub).should.exist;
  });
  
  it('should create a league schedule', () => {
    const firstClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      clubName: 'Strikers \'87',
      manager: 'Jim Strother'
    }),
    
    secondClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      clubName: 'Team RamRod',
      manager: 'Daniel Mayberry'
    }),
    
    thirdClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      clubName: 'ThunderTurtelUnited',
      manager: 'Ryan Pritchett'
    }),
    
    fourthClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      clubName: 'Better than Mayberry',
      manager: 'Mark Enders'
    }),
    fifthClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      clubName: 'Westside Hooligan',
      manager: 'Shaun Kendall'
    });
    
    let clubArray = [firstClub, secondClub, thirdClub, fourthClub, fifthClub];
    return scheduleCreator(clubArray).should.exist;
  });
  
  // it('should resolve match outcomes', () => {
    
  // });
  
  // it('should calculate the league standings', () => {
    
  // });
});