const mongoose = require('mongoose'),
	chai = require('chai'), // if you need expect or should, then you need to import chai also
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require('chai-as-promised'),
	should = chai.should(),
	expect = chai.expect,
	dbUser = 'gameUser',
	dbPassword = 'gamePassword',
	dbTestConnection = `mongodb://${dbUser}:${dbPassword}@ds137271.mlab.com:37271/fantasy-soccer-db-test`,
  FantasyMatch = require("../models/fantasyMatch_model.js"),
  FantasyClub = require("../models/fantasyClub_model.js"),
  WeeklyMatches = require("../models/weeklyMatches_model.js"),
  User = require("../models/user_model.js"),
	testCurrentUser = {
	  _id: new mongoose.Types.ObjectId(),
  	accessToken: 1974,
	  displayName: 'Clint Dempsey',
	  givenName: 'Clint',
	  familyName: 'Dempsey',
	  userPhoto: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg',
	  googleId: 2
  },
	testPlayer = {
    idFromAPI: 1,
    commonName: 'Deuce',
    fullName: 'Clint Dempsey',
    firstName: 'Clint',
    lastName: 'Dempsey',
    position: 'Forward',
    picture: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg',
    leagueId: 779,
    clubName: 'Seattle Sounders FC',
    clubId: 1974,
    clubLogo: 'www.picture.url',
    stats: {
      shots: {
        shotsTotal: 12,
        shotsOnGoal: 10
      },
      goals: {
        scored: 9,
        conceded: 0,
        ownGoals: 0
      },
      fouls: {
        drawn: 11,
        committed: 5
      },
      cards: {
        yellowCards: 3,
        redCards: 1
      },
      passing: {
        totalCrosses: 21,
        crossingAccuracy: 85,
        totalPasses: 34,
        passingAccuracy: 88
      },
      other: {
        assists: 10,
        offsides: 3,
        saves: 0,
        penaltiesScored: 2,
        penaltiesMissed: 0,
        penaltiesSaved: 0,
        tackles: 13,
        blocks: 0,
        interceptions: 7,
        clearances: 2,
        minutesPlayed: 90
      }
    },
    fantasyPoints: {
      fixture: 8,
      season: 32
    }
  },
  testPlayer2 = {
    idFromAPI: 2,
    commonName: 'Jonesy',
    fullName: 'Bill Jones',
    firstName: 'Bill',
    lastName: 'Jones',
    position: 'Forward',
    picture: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg',
    leagueId: 8,
    clubName: 'Newcastle United FC',
    clubId: 1974,
    clubLogo: 'www.picture.url',
    stats: {
      shots: {
        shotsTotal: 12,
        shotsOnGoal: 10
      },
      goals: {
        scored: 9,
        conceded: 0,
        ownGoals: 0
      },
      fouls: {
        drawn: 11,
        committed: 5
      },
      cards: {
        yellowCards: 3,
        redCards: 1
      },
      passing: {
        totalCrosses: 21,
        crossingAccuracy: 85,
        totalPasses: 34,
        passingAccuracy: 88
      },
      other: {
        assists: 10,
        offsides: 3,
        saves: 0,
        penaltiesScored: 2,
        penaltiesMissed: 0,
        penaltiesSaved: 0,
        tackles: 13,
        blocks: 0,
        interceptions: 7,
        clearances: 2,
        minutesPlayed: 90
      }
    },
    fantasyPoints: {
      fixture: 8,
      season: 32
    }
  },
  testPlayer3 = {
    idFromAPI: 3,
    commonName: 'Brickwall',
    fullName: 'Kasey Keller',
    firstName: 'Kasey',
    lastName: 'Keller',
    position: 'Goalkeeper',
    picture: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg',
    leagueId: 779,
    clubName: 'Seattle Sounders FC',
    clubId: 1974,
    clubLogo: 'www.picture.url',
    stats: {
      shots: {
        shotsTotal: 12,
        shotsOnGoal: 10
      },
      goals: {
        scored: 9,
        conceded: 0,
        ownGoals: 0
      },
      fouls: {
        drawn: 11,
        committed: 5
      },
      cards: {
        yellowCards: 3,
        redCards: 1
      },
      passing: {
        totalCrosses: 21,
        crossingAccuracy: 85,
        totalPasses: 34,
        passingAccuracy: 88
      },
      other: {
        assists: 10,
        offsides: 3,
        saves: 0,
        penaltiesScored: 2,
        penaltiesMissed: 0,
        penaltiesSaved: 0,
        tackles: 13,
        blocks: 0,
        interceptions: 7,
        clearances: 2,
        minutesPlayed: 90
      }
    },
    fantasyPoints: {
      fixture: 8,
      season: 32
    }
  },
  fantasyLeagueId = 779,
  fantasyLeagueName = 'Major League Soccer (USA)',
  firstManager = new User({
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Jim Strother',
    givenName: 'Jim',
    familyName: 'Strother',
    googleId: 1977,
    accessToken: 123456789
  }),
  secondManager = new User({
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Daniel Mayberry',
    givenName: 'Daniel',
    familyName: 'Mayberry',
    googleId: 1978,
    accessToken: 987654321
  }),
  thirdManager = new User({
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Ryan Pritchett',
    givenName: 'Ryan',
    familyName: 'Pritchett',
    googleId: 1979,
    accessToken: 1597532648
  }),
  fourthManager = new User({
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Mark Enders',
    givenName: 'Mark',
    familyName: 'Enders',
    googleId: 1980,
    accessToken: 9513578462
  }),
  fifthManager = new User({
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Shaun Kendall',
    givenName: 'Shaun',
    familyName: 'Kendall',
    googleId: 1981,
    accessToken: 3579514682
  }),
  firstClub = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Strikers \'87',
    manager: firstManager._id,
    points: 17,
    wins: 5,
    draws: 2,
    losses: 3,
    goalsFor: 160,
    goalsAgainst: 100,
    goalDifferential: 60,
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
    ]
  }),
  secondClub = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Team RamRod',
    manager: secondManager._id,
    points: 15,
    wins: 4,
    draws: 3,
    losses: 3,
    goalsFor: 200,
    goalsAgainst: 180,
    goalDifferential: 20,
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
    ]
  }),
  thirdClub = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'ThunderTurtleUnited',
    manager: thirdManager._id,
    points: 15,
    wins: 4,
    draws: 3,
    losses: 3,
    goalsFor: 210,
    goalsAgainst: 180,
    goalDifferential: 30,
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
    ]
  }),
  fourthClub = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Better than Mayberry',
    manager: fourthManager._id,
    points: 18,
    wins: 5,
    draws: 3,
    losses: 2,
    goalsFor: 170,
    goalsAgainst: 155,
    goalDifferential: 15,
    starters: [
      {
        idFromAPI: 34,
        fantasyPoints: {
          fixture: 7
        }
      },
      {
        idFromAPI: 35,
        fantasyPoints: {
          fixture: 6
        }
      },
      {
        idFromAPI: 36,
        fantasyPoints: {
          fixture: 5
        }
      },
      {
        idFromAPI: 37,
        fantasyPoints: {
          fixture: 4
        }
      },
      {
        idFromAPI: 38,
        fantasyPoints: {
          fixture: 2
        }
      },
      {
        idFromAPI: 39,
        fantasyPoints: {
          fixture: 10
        }
      },
      {
        idFromAPI: 40,
        fantasyPoints: {
          fixture: 11
        }
      },
      {
        idFromAPI: 41,
        fantasyPoints: {
          fixture: 6
        }
      },
      {
        idFromAPI: 42,
        fantasyPoints: {
          fixture: 10
        }
      },
      {
        idFromAPI: 43,
        fantasyPoints: {
          fixture: 5
        }
      },
      {
        idFromAPI: 44,
        fantasyPoints: {
          fixture: 3
        }
      }
    ]
  }),
  fifthClub = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Westside Hooligan',
    manager: fifthManager._id,
    points: 14,
    wins: 3,
    draws: 5,
    losses: 2,
    goalsFor: 145,
    goalsAgainst: 160,
    goalDifferential: -15,
    starters: [
      {
        idFromAPI: 45,
        fantasyPoints: {
          fixture: 5
        }
      },
      {
        idFromAPI: 46,
        fantasyPoints: {
          fixture: 4
        }
      },
      {
        idFromAPI: 47,
        fantasyPoints: {
          fixture: 6
        }
      },
      {
        idFromAPI: 48,
        fantasyPoints: {
          fixture: 7
        }
      },
      {
        idFromAPI: 49,
        fantasyPoints: {
          fixture: 8
        }
      },
      {
        idFromAPI: 50,
        fantasyPoints: {
          fixture: 2
        }
      },
      {
        idFromAPI: 51,
        fantasyPoints: {
          fixture: 5
        }
      },
      {
        idFromAPI: 52,
        fantasyPoints: {
          fixture: 14
        }
      },
      {
        idFromAPI: 53,
        fantasyPoints: {
          fixture: 1
        }
      },
      {
        idFromAPI: 54,
        fantasyPoints: {
          fixture: 9
        }
      },
      {
        idFromAPI: 55,
        fantasyPoints: {
          fixture: 6
        }
      }
    ]
  }),
  sixthClub = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Average',
    points: 9,
    wins: 2,
    draws: 3,
    losses: 5,
    goalsFor: 100,
    goalsAgainst: 280,
    goalDifferential: -180,
  }),
  manager1 = {
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Jim Strother',
    givenName: 'Jim',
    familyName: 'Strother',
    googleId: 1977,
    accessToken: 123456789
  },
  manager2 = {
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Daniel Mayberry',
    givenName: 'Daniel',
    familyName: 'Mayberry',
    googleId: 1978,
    accessToken: 987654321
  },
  manager3 = {
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
    manager: manager1,
    starters: [
      {
        idFromAPI: 1,
        fantasyPoints: {
          fixture: 9
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
    manager: manager2,
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
    manager: manager3,
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
  week1Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week1Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week2Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week2Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week3Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week3Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week4Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week4Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week5Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week5Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week6Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week6Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week7Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week7Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week8Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week8Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week9Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week9Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week10Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week10Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week11Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week11Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week12Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week12Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week13Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week13Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week14Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week14Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week15Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week15Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week16Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week16Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week17Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week17Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week18Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week18Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week19Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week19Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week20Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week20Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week21Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week21Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week22Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week22Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week23Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week23Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week24Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week24Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week25Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week25Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week26Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week26Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week27Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week27Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week28Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week28Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week29Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week29Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week30Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week30Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week31Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week31Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week32Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week32Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week33Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week33Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week34Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week34Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week35Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week35Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week36Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week36Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week37Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne,
    awayClub: clubTwo,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week37Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree,
    awayClub: averageClub,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week38Match1 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo,
    awayClub: clubThree,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week38Match2 = {
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub,
    awayClub: clubOne,
    homeScore: 0,
    awayScore: 0,
    final: false
  },
  week1 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 1,
    matches: [week1Match1, week1Match2],
    datesToRun: new Date(2018, 02, 01)
  },
  week2 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 2,
    matches: [week2Match1, week2Match2],
    datesToRun: new Date(2018, 02, 08)
  },
  week3 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 3,
    matches: [week3Match1, week3Match2],
    datesToRun: new Date(2018, 02, 15)
  },
  week4 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 4,
    matches: [week4Match1, week4Match2],
    datesToRun: new Date(2018, 02, 22)
  },
  week5 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 5,
    matches: [week5Match1, week5Match2],
    datesToRun: new Date(2018, 02, 29)
  },
  week6 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 6,
    matches: [week6Match1, week6Match2],
    datesToRun: new Date(2018, 03, 05)
  },
  week7 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 7,
    matches: [week7Match1, week7Match2],
    datesToRun: new Date(2018, 03, 12)
  },
  week8 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 8,
    matches: [week8Match1, week8Match2],
    datesToRun: new Date(2018, 03, 19)
  },
  week9 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 9,
    matches: [week9Match1, week9Match2],
    datesToRun: new Date(2018, 03, 26)
  },
  week10 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 10,
    matches: [week10Match1, week10Match2],
    datesToRun: new Date(2018, 04, 03)
  },
  week11 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 11,
    matches: [week11Match1, week11Match2],
    datesToRun: new Date(2018, 04, 10)
  },
  week12 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 12,
    matches: [week12Match1, week12Match2],
    datesToRun: new Date(2018, 04, 17)
  },
  week13 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 13,
    matches: [week13Match1, week13Match2],
    datesToRun: new Date(2018, 04, 24)
  },
  week14 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 14,
    matches: [week14Match1, week14Match2],
    datesToRun: new Date(2018, 04, 31)
  },
  week15 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 15,
    matches: [week15Match1, week15Match2],
    datesToRun: new Date(2018, 05, 07)
  },
  week16 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 16,
    matches: [week16Match1, week16Match2],
    datesToRun: new Date(2018, 05, 14)
  },
  week17 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 17,
    matches: [week17Match1, week17Match2],
    datesToRun: new Date(2018, 05, 21)
  },
  week18 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 18,
    matches: [week18Match1, week18Match2],
    datesToRun: new Date(2018, 05, 28)
  },
  week19 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 19,
    matches: [week19Match1, week19Match2],
    datesToRun: new Date(2018, 06, 05)
  },
  week20 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 20,
    matches: [week20Match1, week20Match2],
    datesToRun: new Date(2018, 06, 12)
  },
  week21 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 21,
    matches: [week21Match1, week21Match2],
    datesToRun: new Date(2018, 06, 19)
  },
  week22 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 22,
    matches: [week22Match1, week22Match2],
    datesToRun: new Date(2018, 06, 26)
  },
  week23 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 23,
    matches: [week23Match1, week23Match2],
    datesToRun: new Date(2018, 07, 02)
  },
  week24 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 24,
    matches: [week24Match1, week24Match2],
    datesToRun: new Date(2018, 07, 09)
  },
  week25 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 25,
    matches: [week25Match1, week25Match2],
    datesToRun: new Date(2018, 07, 16)
  },
  week26 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 26,
    matches: [week26Match1, week26Match2],
    datesToRun: new Date(2018, 07, 23)
  },
  week27 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 27,
    matches: [week27Match1, week27Match2],
    datesToRun: new Date(2018, 07, 30)
  },
  week28 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 28,
    matches: [week28Match1, week28Match2],
    datesToRun: new Date(2018, 08, 06)
  },
  week29 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 29,
    matches: [week29Match1, week29Match2],
    datesToRun: new Date(2018, 08, 13)
  },
  week30 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 30,
    matches: [week30Match1, week30Match2],
    datesToRun: new Date(2018, 08, 20)
  },
  week31 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 31,
    matches: [week31Match1, week31Match2],
    datesToRun: new Date(2018, 08, 27)
  },
  week32 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 32,
    matches: [week32Match1, week32Match2],
    datesToRun: new Date(2018, 09, 04)
  },
  week33 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 33,
    matches: [week33Match1, week33Match2],
    datesToRun: new Date(2018, 09, 11)
  },
  week34 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 34,
    matches: [week34Match1, week34Match2],
    datesToRun: new Date(2018, 09, 18)
  },
  week35 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 35,
    matches: [week35Match1, week35Match2],
    datesToRun: new Date(2018, 09, 25)
  },
  week36 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 36,
    matches: [week36Match1, week36Match2],
    datesToRun: new Date(2018, 10, 01)
  },
  week37 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 37,
    matches: [week37Match1, week37Match2],
    datesToRun: new Date(2018, 10, 08)
  },
  week38 = {
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 38,
    matches: [week38Match1, week38Match2],
    datesToRun: new Date(2018, 10, 15)
  },
  fullSchedule = [week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15, week16, week17, week18, week19, week20, week21, week22, week23, week24, week25, week26, week27, week28, week29, week30, week31, week32, week33, week34, week35, week36, week37, week38],
  clubArray = [clubOne, clubTwo, clubThree, averageClub];

module.exports = {
	mongoose,
	chai,
	chaiHTTP,
	chaiAsPromised,
	should,
	expect,
	dbTestConnection,
	testCurrentUser,
	testPlayer,
	testPlayer2,
	testPlayer3,
	fantasyLeagueId,
	fantasyLeagueName,
	firstManager,
	secondManager,
	thirdManager,
	fourthManager,
	fifthManager,
	firstClub,
	secondClub,
	thirdClub,
	fourthClub,
	fifthClub,
	sixthClub,
	fullSchedule,
	clubArray
};