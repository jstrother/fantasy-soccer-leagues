const {matchResolver, save} = require("../../server/programFunctions/scheduleCreation_function.js"),
  {chai, chaiHTTP, dbTestConnection, mongoose} = require("../common.js"),
  FantasyMatch = require("../../models/fantasyMatch_model.js"),
  FantasyClub = require("../../models/fantasyClub_model.js"),
  WeeklyMatches = require("../../models/weeklyMatches_model.js"),
  User = require("../../models/user_model.js");

mongoose.Promise = Promise;

describe('Matches Resolver', () => {
  before(() => {
    return mongoose.connect(dbTestConnection);
    
  });
  
  after(() => {
    return mongoose.connection.db.dropDatabase(dbTestConnection);
  });
  
  it.only('should resolve matches that have already happened', () => {
    const accessToken = 1234567890;
    
    let firstManager = new User({
      _id: new mongoose.Types.ObjectId(),
      displayName: 'Jim Strother',
      givenName: 'Jim',
      familyName: 'Strother',
      googleId: 1977
    });
    
    let secondManager = new User({
      _id: new mongoose.Types.ObjectId(),
      displayName: 'Bob Dylan',
      givenName: 'Bob',
      familyName: 'Dylan',
      googleId: 1968
    });
    
    let firstClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      clubName: 'Strikers \'87',
      manager: firstManager._id,
      starters: [
        {
          idFromAPI: 1,
          fantasyPoints: {
            fixture: 7
          }
        },
        {
          idFromAPI: 2,
          fantasyPoints: {
            fixture: 5
          }
        },
        {
          idFromAPI: 3,
          fantasyPoints: {
            fixture: 3
          }
        },
        {
          idFromAPI: 4,
          fantasyPoints: {
            fixture: 10
          }
        },
        {
          idFromAPI: 5,
          fantasyPoints: {
            fixture: 8
          }
        },
        {
          idFromAPI: 6,
          fantasyPoints: {
            fixture: 4
          }
        },
        {
          idFromAPI: 7,
          fantasyPoints: {
            fixture: 5
          }
        },
        {
          idFromAPI: 8,
          fantasyPoints: {
            fixture: 6
          }
        },
        {
          idFromAPI: 9,
          fantasyPoints: {
            fixture: 12
          }
        },
        {
          idFromAPI: 10,
          fantasyPoints: {
            fixture: 8
          }
        },
        {
          idFromAPI: 11,
          fantasyPoints: {
            fixture: 3
          }
        }
      ],
      benchwarmers: [
        {
          idFromAPI: 12,
          fantasyPoints: {
            fixture: 6
          }
        },
        {
          idFromAPI: 13,
          fantasyPoints: {
            fixture: 3
          }
        },
        {
          idFromAPI: 14,
          fantasyPoints: {
            fixture: 8
          }
        },
        {
          idFromAPI: 15,
          fantasyPoints: {
            fixture: 8
          }
        },
        {
          idFromAPI: 16,
          fantasyPoints: {
            fixture: 9
          }
        },
        {
          idFromAPI: 17,
          fantasyPoints: {
            fixture: 11
          }
        },
        {
          idFromAPI: 18,
          fantasyPoints: {
            fixture: 2
          }
        }
      ]
    });
    
    let secondClub = new FantasyClub({
      _id: new mongoose.Types.ObjectId(),
      clubName: 'Phantoms FC',
      manager: secondManager._id,
      starters: [
        {
          idFromAPI: 19,
          fantasyPoints: {
            fixture: 7
          }
        },
        {
          idFromAPI: 20,
          fantasyPoints: {
            fixture: 9
          }
        },
        {
          idFromAPI: 21,
          fantasyPoints: {
            fixture: 11
          }
        },
        {
          idFromAPI: 22,
          fantasyPoints: {
            fixture: 8
          }
        },
        {
          idFromAPI: 23,
          fantasyPoints: {
            fixture: 9
          }
        },
        {
          idFromAPI: 24,
          fantasyPoints: {
            fixture: 12
          }
        },
        {
          idFromAPI: 25,
          fantasyPoints: {
            fixture: 5
          }
        },
        {
          idFromAPI: 26,
          fantasyPoints: {
            fixture: 4
          }
        },
        {
          idFromAPI: 27,
          fantasyPoints: {
            fixture: 9
          }
        },
        {
          idFromAPI: 28,
          fantasyPoints: {
            fixture: 11
          }
        },
        {
          idFromAPI: 29,
          fantasyPoints: {
            fixture: 2
          }
        }
      ],
      benchwarmers: [
        {
          idFromAPI: 30,
          fantasyPoints: {
            fixture: 6
          }
        },
        {
          idFromAPI: 31,
          fantasyPoints: {
            fixture: 5
          }
        },
        {
          idFromAPI: 32,
          fantasyPoints: {
            fixture: 8
          }
        },
        {
          idFromAPI: 33,
          fantasyPoints: {
            fixture: 4
          }
        },
        {
          idFromAPI: 34,
          fantasyPoints: {
            fixture: 7
          }
        },
        {
          idFromAPI: 35,
          fantasyPoints: {
            fixture: 3
          }
        },
        {
          idFromAPI: 36,
          fantasyPoints: {
            fixture: 4
          }
        }
      ]
    });
    
    let firstMatch = new FantasyMatch({
      _id: new mongoose.Types.ObjectId(),
      homeClub: firstClub._id,
      awayClub: secondClub._id,
      homeScore: 0,
      awayScore: 0,
      final: false
    });
    
    let secondMatch = new FantasyMatch({
      _id: new mongoose.Types.ObjectId(),
      homeClub: secondClub._id,
      awayClub: firstClub._id,
      homeScore: 0,
      awayScore: 0,
      final: false
    });
    
    let thirdMatch = new FantasyMatch({
      _id: new mongoose.Types.ObjectId(),
      homeClub: firstClub._id,
      awayClub: secondClub._id,
      homeScore: 0,
      awayScore: 0,
      final: false
    });
    
    let fourthMatch = new FantasyMatch({
      _id: new mongoose.Types.ObjectId(),
      homeClub: secondClub._id,
      awayClub: firstClub._id,
      homeScore: 0,
      awayScore: 0,
      final: false
    });
    
    let firstWeek = new WeeklyMatches({
      _id: new mongoose.Types.ObjectId(),
      roundNumber: 1,
      matches: [firstMatch._id],
      matchesResolved: false,
      datesToRun: new Date(2018, 02, 01)
    });
    
    let secondWeek = new WeeklyMatches({
      _id: new mongoose.Types.ObjectId(),
      roundNumber: 1,
      matches: [secondMatch._id],
      matchesResolved: false,
      datesToRun: new Date(2018, 02, 08)
    });
    
    let thirdWeek = new WeeklyMatches({
      _id: new mongoose.Types.ObjectId(),
      roundNumber: 1,
      matches: [thirdMatch._id],
      matchesResolved: false,
      datesToRun: new Date(2018, 02, 15)
    });
    
    let fourthWeek = new WeeklyMatches({
      _id: new mongoose.Types.ObjectId(),
      roundNumber: 1,
      matches: [fourthMatch._id],
      matchesResolved: false,
      datesToRun: new Date(2018, 02, 22)
    });
    
    const allWeeklyMatches = [firstWeek, secondWeek, thirdWeek, fourthWeek],
      clubArray = [firstClub, secondClub];
    
    Promise.all([
      save(firstManager),
      save(secondManager),
      save(firstClub),
      save(secondClub),
      save(firstMatch),
      save(secondMatch),
      save(thirdMatch),
      save(fourthMatch),
      save(firstWeek),
      save(secondWeek),
      save(thirdWeek),
      save(fourthWeek)
    ])
    .then(() => {
      matchResolver(allWeeklyMatches, clubArray);
    })
    .catch(error => {
      throw new Error(error);
    });
  });
});