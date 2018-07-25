const mongoose = require('mongoose'),
	chai = require('chai'), // if you need expect or should, then you need to import chai also
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require('chai-as-promised'),
	should = chai.should(),
	expect = chai.expect,
	dbUser = 'gameUser',
	dbPassword = 'gamePassword',
	dbTestConnection = `mongodb://${dbUser}:${dbPassword}@ds137271.mlab.com:37271/fantasy-soccer-db-test`,
  FantasyClub = require("../models/fantasyClub_model.js"),
  User = require("../models/user_model.js"),
  FantasyMatch = require("../models/fantasyMatch_model.js"),
  WeeklyMatches = require("../models/weeklyMatches_model.js"),
  FantasySchedule = require("../models/fantasySchedule_model.js"),
	testCurrentUser = {
	  _id: new mongoose.Types.ObjectId(),
  	accessToken: 2222,
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
    clubId: 1892,
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
  manager1 = new User({
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Jim Strother',
    givenName: 'Jim',
    familyName: 'Strother',
    googleId: 1977,
    accessToken: 123456789
  }),
  manager2 = new User({
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Daniel Mayberry',
    givenName: 'Daniel',
    familyName: 'Mayberry',
    googleId: 1978,
    accessToken: 987654321
  }),
  manager3 = new User({
    _id: new mongoose.Types.ObjectId(),
    displayName: 'Ryan Pritchett',
    givenName: 'Ryan',
    familyName: 'Pritchett',
    googleId: 1979,
    accessToken: 1597532648
  }),
  clubOne = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Strikers \'87',
    manager: manager1._id,
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
  }),
  clubTwo = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Team RamRod',
    manager: manager2._id,
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
  }),
  clubThree = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'ThunderTurtleUnited',
    manager: manager3._id,
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
  }),
  averageClub = new FantasyClub({
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
  }),
  week1Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week1Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week2Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week2Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week3Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week3Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week4Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week4Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week5Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week5Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week6Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week6Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week7Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week7Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week8Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week8Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week9Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week9Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week10Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week10Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week11Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week11Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week12Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week12Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week13Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week13Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week14Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week14Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week15Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week15Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week16Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week16Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week17Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week17Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week18Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week18Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week19Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week19Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week20Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week20Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week21Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week21Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week22Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week22Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week23Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week23Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week24Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week24Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week25Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week25Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week26Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week26Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week27Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week27Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week28Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week28Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week29Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week29Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week30Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week30Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week31Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week31Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week32Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week32Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week33Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week33Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week34Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week34Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week35Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week35Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week36Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week36Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week37Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubOne._id,
    awayClub: clubTwo._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week37Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubThree._id,
    awayClub: averageClub._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week38Match1 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: clubTwo._id,
    awayClub: clubThree._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week38Match2 = new FantasyMatch({
    _id: new mongoose.Types.ObjectId(),
    homeClub: averageClub._id,
    awayClub: clubOne._id,
    homeScore: 0,
    awayScore: 0,
    final: false
  }),
  week1 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 1,
    matches: [week1Match1._id, week1Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0000)
  }),
  week2 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 2,
    matches: [week2Match1._id, week2Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0005)
  }),
  week3 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 3,
    matches: [week3Match1._id, week3Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0010)
  }),
  week4 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 4,
    matches: [week4Match1._id, week4Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0015)
  }),
  week5 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 5,
    matches: [week5Match1._id, week5Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0020)
  }),
  week6 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 6,
    matches: [week6Match1._id, week6Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0025)
  }),
  week7 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 7,
    matches: [week7Match1._id, week7Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0030)
  }),
  week8 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 8,
    matches: [week8Match1._id, week8Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0035)
  }),
  week9 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 9,
    matches: [week9Match1._id, week9Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0040)
  }),
  week10 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 10,
    matches: [week10Match1._id, week10Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0045)
  }),
  week11 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 11,
    matches: [week11Match1._id, week11Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0050)
  }),
  week12 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 12,
    matches: [week12Match1._id, week12Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0055)
  }),
  week13 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 13,
    matches: [week13Match1._id, week13Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0060)
  }),
  week14 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 14,
    matches: [week14Match1._id, week14Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0065)
  }),
  week15 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 15,
    matches: [week15Match1._id, week15Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0070)
  }),
  week16 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 16,
    matches: [week16Match1._id, week16Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0075)
  }),
  week17 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 17,
    matches: [week17Match1._id, week17Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0080)
  }),
  week18 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 18,
    matches: [week18Match1._id, week18Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0085)
  }),
  week19 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 19,
    matches: [week19Match1._id, week19Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0090)
  }),
  week20 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 20,
    matches: [week20Match1._id, week20Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0095)
  }),
  week21 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 21,
    matches: [week21Match1._id, week21Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0100)
  }),
  week22 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 22,
    matches: [week22Match1._id, week22Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0105)
  }),
  week23 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 23,
    matches: [week23Match1._id, week23Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0110)
  }),
  week24 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 24,
    matches: [week24Match1._id, week24Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0115)
  }),
  week25 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 25,
    matches: [week25Match1._id, week25Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0120)
  }),
  week26 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 26,
    matches: [week26Match1._id, week26Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0125)
  }),
  week27 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 27,
    matches: [week27Match1._id, week27Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0130)
  }),
  week28 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 28,
    matches: [week28Match1._id, week28Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0135)
  }),
  week29 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 29,
    matches: [week29Match1._id, week29Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0140)
  }),
  week30 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 30,
    matches: [week30Match1._id, week30Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0145)
  }),
  week31 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 31,
    matches: [week31Match1._id, week31Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0150)
  }),
  week32 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 32,
    matches: [week32Match1._id, week32Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0155)
  }),
  week33 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 33,
    matches: [week33Match1._id, week33Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0160)
  }),
  week34 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 34,
    matches: [week34Match1._id, week34Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0165)
  }),
  week35 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 35,
    matches: [week35Match1._id, week35Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0170)
  }),
  week36 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 36,
    matches: [week36Match1._id, week36Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0175)
  }),
  week37 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 37,
    matches: [week37Match1._id, week37Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0180)
  }),
  week38 = new WeeklyMatches({
    _id: new mongoose.Types.ObjectId(),
    roundNumber: 38,
    matches: [week38Match1._id, week38Match2._id],
    datesToRun: new Date(2018, 02, 01, 13, 15, 30, 0185)
  }),
  fullSchedule = new FantasySchedule({
    weeklyMatches: [week1._id, week2._id, week3._id, week4._id, week5._id, week6._id, week7._id, week8._id, week9._id, week10._id, week11._id, week12._id, week13._id, week14._id, week15._id, week16._id, week17._id, week18._id, week19._id, week20._id, week21._id, week22._id, week23._id, week24._id, week25._id, week26._id, week27._id, week28._id, week29._id, week30._id, week31._id, week32._id, week33._id, week34._id, week35._id, week36._id, week37._id, week38._id]
  }),
  managerArray = [manager1, manager2, manager3],
  clubArray = [clubOne, clubTwo, clubThree, averageClub],
  matchesArray = [week1Match1, week2Match1, week3Match1, week4Match1, week5Match1, week6Match1, week7Match1, week8Match1, week9Match1, week10Match1, week11Match1, week12Match1, week13Match1, week14Match1, week15Match1, week16Match1, week17Match1, week18Match1, week19Match1, week20Match1, week21Match1, week22Match1, week23Match1, week24Match1, week25Match1, week26Match1, week27Match1, week28Match1, week29Match1, week30Match1, week31Match1, week32Match1, week33Match1, week34Match1, week35Match1, week36Match1, week37Match1, week38Match1, week1Match2, week2Match2, week3Match2, week4Match2, week5Match2, week6Match2, week7Match2, week8Match2, week9Match2, week10Match2, week11Match2, week12Match2, week13Match2, week14Match2, week15Match2, week16Match2, week17Match2, week18Match2, week19Match2, week20Match2, week21Match2, week22Match2, week23Match2, week24Match2, week25Match2, week26Match2, week27Match2, week28Match2, week29Match2, week30Match2, week31Match2, week32Match2, week33Match2, week34Match2, week35Match2, week36Match2, week37Match2, week38Match2],
  weeklyArray = [week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15, week16, week17, week18, week19, week20, week21, week22, week23, week24, week25, week26, week27, week28, week29, week30, week31, week32, week33, week34, week35, week36, week37, week38],
  strikers87Id = clubOne._id;

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
	managerArray,
	clubArray,
	matchesArray,
	weeklyArray,
	strikers87Id
};