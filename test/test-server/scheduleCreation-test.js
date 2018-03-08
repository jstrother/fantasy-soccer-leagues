const { mongoose, chai, chaiHTTP, should } = require('../common.js'),
  FantasyMatch = require('../../models/fantasyMatch_model.js'),
  FantasyClub = require('../../models/fantasyClub_model.js'),
  FantasySchedule = require('../../models/fantasySchedule_model.js'),
  { app } = require('../../server/server.js'),
  scheduleCreationRouter = require("../../server/scheduleCreation-routes.js").scheduleCreationRouter,
  { save, matchCreator, scheduleCreator, matchResolver } = require("../../server/programFunctions/scheduleCreation_function.js");

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
    
    save(firstClub);
    save(secondClub);
    
    return matchCreator(firstClub, secondClub).should.exist;
  });
  
  // it('should create a league schedule', () => {
  //   const firstClub = new FantasyClub({
  //     _id: new mongoose.Types.ObjectId(),
  //     clubName: 'Strikers \'87',
  //     manager: 'Jim Strother'
  //   }),
  //   secondClub = new FantasyClub({
  //     _id: new mongoose.Types.ObjectId(),
  //     clubName: 'Team RamRod',
  //     manager: 'Daniel Mayberry'
  //   }),
  //   thirdClub = new FantasyClub({
  //     _id: new mongoose.Types.ObjectId(),
  //     clubName: 'ThunderTurtleUnited',
  //     manager: 'Ryan Pritchett'
  //   }),
  //   fourthClub = new FantasyClub({
  //     _id: new mongoose.Types.ObjectId(),
  //     clubName: 'Better than Mayberry',
  //     manager: 'Mark Enders'
  //   }),
  //   fifthClub = new FantasyClub({
  //     _id: new mongoose.Types.ObjectId(),
  //     clubName: 'Westside Hooligan',
  //     manager: 'Shaun Kendall'
  //   });
    
  //   let clubArray = [firstClub, secondClub, thirdClub, fourthClub, fifthClub];
  //   return scheduleCreator(clubArray).should.exist;
  // });
  
  // it('should resolve match outcomes', () => {
  //   const firstClub = new FantasyClub({
  //     _id: new mongoose.Types.ObjectId(),
  //     clubName: 'Strikers \'87',
  //     manager: 'Jim Strother',
  //     starters: [
  //       {
  //         idFromAPI: 1,
  //         fantasyPoints: {
  //           fixture: 8
  //         }
  //       },
  //       {
  //         idFromAPI: 2,
  //         fantasyPoints: {
  //           fixture: 3
  //         }
  //       },
  //       {
  //         idFromAPI: 3,
  //         fantasyPoints: {
  //           fixture: 6
  //         }
  //       },
  //       {
  //         idFromAPI: 4,
  //         fantasyPoints: {
  //           fixture: 10
  //         }
  //       },
  //       {
  //         idFromAPI: 5,
  //         fantasyPoints: {
  //           fixture: 0
  //         }
  //       },
  //       {
  //         idFromAPI: 6,
  //         fantasyPoints: {
  //           fixture: 11
  //         }
  //       },
  //       {
  //         idFromAPI: 7,
  //         fantasyPoints: {
  //           fixture: 3
  //         }
  //       },
  //       {
  //         idFromAPI: 8,
  //         fantasyPoints: {
  //           fixture: 1
  //         }
  //       },
  //       {
  //         idFromAPI: 9,
  //         fantasyPoints: {
  //           fixture: 4
  //         }
  //       },
  //       {
  //         idFromAPI: 10,
  //         fantasyPoints: {
  //           fixture: 0
  //         }
  //       },
  //       {
  //         idFromAPI: 11,
  //         fantasyPoints: {
  //           fixture: 7
  //         }
  //       }
  //     ]
  //   }),
  //   secondClub = new FantasyClub({
  //     _id: new mongoose.Types.ObjectId(),
  //     clubName: 'Team RamRod',
  //     manager: 'Daniel Mayberry',
  //     starters: [
  //       {
  //         idFromAPI: 12,
  //         fantasyPoints: {
  //           fixture: 4
  //         }
  //       },
  //       {
  //         idFromAPI: 13,
  //         fantasyPoints: {
  //           fixture: 5
  //         }
  //       },
  //       {
  //         idFromAPI: 14,
  //         fantasyPoints: {
  //           fixture: 7
  //         }
  //       },
  //       {
  //         idFromAPI: 15,
  //         fantasyPoints: {
  //           fixture: 6
  //         }
  //       },
  //       {
  //         idFromAPI: 16,
  //         fantasyPoints: {
  //           fixture: 2
  //         }
  //       },
  //       {
  //         idFromAPI: 17,
  //         fantasyPoints: {
  //           fixture: 8
  //         }
  //       },
  //       {
  //         idFromAPI: 18,
  //         fantasyPoints: {
  //           fixture: 14
  //         }
  //       },
  //       {
  //         idFromAPI: 19,
  //         fantasyPoints: {
  //           fixture: 5
  //         }
  //       },
  //       {
  //         idFromAPI: 20,
  //         fantasyPoints: {
  //           fixture: 9
  //         }
  //       },
  //       {
  //         idFromAPI: 21,
  //         fantasyPoints: {
  //           fixture: 1
  //         }
  //       },
  //       {
  //         idFromAPI: 22,
  //         fantasyPoints: {
  //           fixture: 6
  //         }
  //       }
  //     ]
  //   }),
  //   thirdClub = new FantasyClub({
  //     _id: new mongoose.Types.ObjectId(),
  //     clubName: 'ThunderTurtleUnited',
  //     manager: 'Ryan Pritchett',
  //     starters: [
  //       {
  //         idFromAPI: 23,
  //         fantasyPoints: {
  //           fixture: 2
  //         }
  //       },
  //       {
  //         idFromAPI: 24,
  //         fantasyPoints: {
  //           fixture: 6
  //         }
  //       },
  //       {
  //         idFromAPI: 25,
  //         fantasyPoints: {
  //           fixture: 3
  //         }
  //       },
  //       {
  //         idFromAPI: 26,
  //         fantasyPoints: {
  //           fixture: 7
  //         }
  //       },
  //       {
  //         idFromAPI: 27,
  //         fantasyPoints: {
  //           fixture: 0
  //         }
  //       },
  //       {
  //         idFromAPI: 28,
  //         fantasyPoints: {
  //           fixture: 5
  //         }
  //       },
  //       {
  //         idFromAPI: 29,
  //         fantasyPoints: {
  //           fixture: 12
  //         }
  //       },
  //       {
  //         idFromAPI: 30,
  //         fantasyPoints: {
  //           fixture: 9
  //         }
  //       },
  //       {
  //         idFromAPI: 31,
  //         fantasyPoints: {
  //           fixture: 3
  //         }
  //       },
  //       {
  //         idFromAPI: 32,
  //         fantasyPoints: {
  //           fixture: 0
  //         }
  //       },
  //       {
  //         idFromAPI: 33,
  //         fantasyPoints: {
  //           fixture: 7
  //         }
  //       }
  //     ]
  //   }),
  //   fourthClub = new FantasyClub({
  //     _id: new mongoose.Types.ObjectId(),
  //     clubName: 'Better than Mayberry',
  //     manager: 'Mark Enders',
  //     starters: [
  //       {
  //         idFromAPI: 34,
  //         fantasyPoints: {
  //           fixture: 7
  //         }
  //       },
  //       {
  //         idFromAPI: 35,
  //         fantasyPoints: {
  //           fixture: 6
  //         }
  //       },
  //       {
  //         idFromAPI: 36,
  //         fantasyPoints: {
  //           fixture: 5
  //         }
  //       },
  //       {
  //         idFromAPI: 37,
  //         fantasyPoints: {
  //           fixture: 4
  //         }
  //       },
  //       {
  //         idFromAPI: 38,
  //         fantasyPoints: {
  //           fixture: 2
  //         }
  //       },
  //       {
  //         idFromAPI: 39,
  //         fantasyPoints: {
  //           fixture: 10
  //         }
  //       },
  //       {
  //         idFromAPI: 40,
  //         fantasyPoints: {
  //           fixture: 11
  //         }
  //       },
  //       {
  //         idFromAPI: 41,
  //         fantasyPoints: {
  //           fixture: 6
  //         }
  //       },
  //       {
  //         idFromAPI: 42,
  //         fantasyPoints: {
  //           fixture: 10
  //         }
  //       },
  //       {
  //         idFromAPI: 43,
  //         fantasyPoints: {
  //           fixture: 5
  //         }
  //       },
  //       {
  //         idFromAPI: 44,
  //         fantasyPoints: {
  //           fixture: 3
  //         }
  //       }
  //     ]
  //   }),
  //   fifthClub = new FantasyClub({
  //     _id: new mongoose.Types.ObjectId(),
  //     clubName: 'Westside Hooligan',
  //     manager: 'Shaun Kendall',
  //     starters: [
  //       {
  //         idFromAPI: 45,
  //         fantasyPoints: {
  //           fixture: 5
  //         }
  //       },
  //       {
  //         idFromAPI: 46,
  //         fantasyPoints: {
  //           fixture: 4
  //         }
  //       },
  //       {
  //         idFromAPI: 47,
  //         fantasyPoints: {
  //           fixture: 6
  //         }
  //       },
  //       {
  //         idFromAPI: 48,
  //         fantasyPoints: {
  //           fixture: 7
  //         }
  //       },
  //       {
  //         idFromAPI: 49,
  //         fantasyPoints: {
  //           fixture: 8
  //         }
  //       },
  //       {
  //         idFromAPI: 50,
  //         fantasyPoints: {
  //           fixture: 2
  //         }
  //       },
  //       {
  //         idFromAPI: 51,
  //         fantasyPoints: {
  //           fixture: 5
  //         }
  //       },
  //       {
  //         idFromAPI: 52,
  //         fantasyPoints: {
  //           fixture: 14
  //         }
  //       },
  //       {
  //         idFromAPI: 53,
  //         fantasyPoints: {
  //           fixture: 1
  //         }
  //       },
  //       {
  //         idFromAPI: 54,
  //         fantasyPoints: {
  //           fixture: 9
  //         }
  //       },
  //       {
  //         idFromAPI: 55,
  //         fantasyPoints: {
  //           fixture: 6
  //         }
  //       }
  //     ]
  //   }),
  //   clubArray = [firstClub, secondClub, thirdClub, fourthClub, fifthClub];
    
  //   let matchArray = scheduleCreator(clubArray).matches;
    
  //   return matchResolver(matchArray[0]).should.exist;
  // });
  
  // it('should calculate the league standings', () => {
    
  // });
});