const mongoose = require('mongoose'),
	chai = require('chai'), // if you need expect or should, then you need to import chai also
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require("chai-as-promised"),
	should = chai.should(),
	{basicMatchResolver} = require("../../server/programFunctions/basicMatchResolver_function.js"),
	{saveMatches} = require("../../server/programFunctions/saveMatches_function.js"),
  {dbTestConnection} = require("../common.js");

chai.use(chaiHTTP);
chai.use(chaiAsPromised);
mongoose.Promise = Promise;

describe('Matches Resolver', () => {
  before(() => {
    return mongoose.connect(dbTestConnection);
  });
  
  after(() => {
    return mongoose.connection.db.dropDatabase(dbTestConnection)
    .then(() => {
      mongoose.connection.close(() => {
        console.log('connection closed');
      });
    });
  });
  
  let firstManager = {
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Jim Strother',
    givenName: 'Jim',
    familyName: 'Strother',
    googleId: 1977,
    accessToken: 123456789
  },
  secondManager = {
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Daniel Mayberry',
    givenName: 'Daniel',
    familyName: 'Mayberry',
    googleId: 1978,
    accessToken: 987654321
  },
  thirdManager = {
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Ryan Pritchett',
    givenName: 'Ryan',
    familyName: 'Pritchett',
    googleId: 1979,
    accessToken: 1597532648
  },
  clubOne = {
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Strikers \'87',
    manager: firstManager,
    starters: [
      {
        idFromAPI: 1,
        fantasyPoints: {
          fixture: 8
        }
      },
      {
        idFromAPI: 2,
        fantasyPoints: {
          fixture: 3
        }
      },
      {
        idFromAPI: 3,
        fantasyPoints: {
          fixture: 6
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
          fixture: 0
        }
      },
      {
        idFromAPI: 6,
        fantasyPoints: {
          fixture: 11
        }
      },
      {
        idFromAPI: 7,
        fantasyPoints: {
          fixture: 3
        }
      },
      {
        idFromAPI: 8,
        fantasyPoints: {
          fixture: 1
        }
      },
      {
        idFromAPI: 9,
        fantasyPoints: {
          fixture: 4
        }
      },
      {
        idFromAPI: 10,
        fantasyPoints: {
          fixture: 0
        }
      },
      {
        idFromAPI: 11,
        fantasyPoints: {
          fixture: 7
        }
      }
    ],
    wins: 0,
    draws: 0,
    losses: 0,
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifferential: 0,
    gamesPlayed: 0
  },
  clubTwo = {
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Team RamRod',
    manager: secondManager,
    starters: [
      {
        idFromAPI: 12,
        fantasyPoints: {
          fixture: 4
        }
      },
      {
        idFromAPI: 13,
        fantasyPoints: {
          fixture: 5
        }
      },
      {
        idFromAPI: 14,
        fantasyPoints: {
          fixture: 7
        }
      },
      {
        idFromAPI: 15,
        fantasyPoints: {
          fixture: 6
        }
      },
      {
        idFromAPI: 16,
        fantasyPoints: {
          fixture: 2
        }
      },
      {
        idFromAPI: 17,
        fantasyPoints: {
          fixture: 8
        }
      },
      {
        idFromAPI: 18,
        fantasyPoints: {
          fixture: 14
        }
      },
      {
        idFromAPI: 19,
        fantasyPoints: {
          fixture: 5
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
          fixture: 1
        }
      },
      {
        idFromAPI: 22,
        fantasyPoints: {
          fixture: 6
        }
      }
    ],
    wins: 0,
    draws: 0,
    losses: 0,
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifferential: 0,
    gamesPlayed: 0
  },
  clubThree = {
    _id: new mongoose.Types.ObjectId(),
    clubName: 'ThunderTurtleUnited',
    manager: thirdManager,
    starters: [
    {
      idFromAPI: 23,
      fantasyPoints: {
        fixture: 2
      }
    },
    {
      idFromAPI: 24,
      fantasyPoints: {
        fixture: 6
      }
    },
    {
      idFromAPI: 25,
      fantasyPoints: {
        fixture: 3
      }
    },
    {
      idFromAPI: 26,
      fantasyPoints: {
        fixture: 7
      }
    },
    {
      idFromAPI: 27,
      fantasyPoints: {
        fixture: 0
      }
    },
    {
      idFromAPI: 28,
      fantasyPoints: {
        fixture: 5
      }
    },
    {
      idFromAPI: 29,
      fantasyPoints: {
        fixture: 12
      }
    },
    {
      idFromAPI: 30,
      fantasyPoints: {
        fixture: 9
      }
    },
    {
      idFromAPI: 31,
      fantasyPoints: {
        fixture: 3
      }
    },
    {
      idFromAPI: 32,
      fantasyPoints: {
        fixture: 0
      }
    },
    {
      idFromAPI: 33,
      fantasyPoints: {
        fixture: 7
      }
    }
  ],
    wins: 0,
    draws: 0,
    losses: 0,
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifferential: 0,
    gamesPlayed: 0
  },
  averageClub = {
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Average',
    wins: 0,
    draws: 0,
    losses: 0,
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifferential: 0,
    gamesPlayed: 0
  },
  firstMatch1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  firstMatch2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  secondMatch1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  secondMatch2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  thirdMatch1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  thirdMatch2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  firstWeek = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 1,
    matches: [firstMatch1, firstMatch2],
    datesToRun: new Date(2018, 02, 01)
  },
  secondWeek = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 2,
    matches: [secondMatch1, secondMatch2],
    datesToRun: new Date(2018, 02, 08)
  },
  thirdWeek = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 3,
    matches: [thirdMatch1, thirdMatch2],
    datesToRun: new Date(2018, 02, 15)
  };
  const fullSchedule = [firstWeek, secondWeek, thirdWeek],
    clubArray = [clubOne, clubTwo, clubThree, averageClub],
    resolvedMatches = basicMatchResolver(fullSchedule, clubArray),
    savedMatches = saveMatches(resolvedMatches);
  
  it('should resolve matches that have already happened', () => {
    resolvedMatches.should.exist;
  });
  it('should add resolved matches to the database', () => {
    return savedMatches.should.eventually.exist;
  });
});