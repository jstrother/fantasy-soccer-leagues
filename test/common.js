const mongoose = require('mongoose'),
	chai = require('chai'), // if you need expect or should, then you need to import chai also
	chaiHTTP = require('chai-http'),
	chaiAsPromised = require('chai-as-promised'),
	should = chai.should(),
	expect = chai.expect,
	dbUser = 'gameUser',
	dbPassword = 'gamePassword',
	dbTestConnection = `mongodb://${dbUser}:${dbPassword}@ds137271.mlab.com:37271/fantasy-soccer-db-test`,
	testCurrentUser = {
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
  FantasyClub = require("../models/fantasyClub_model.js"),
  firstClub = new FantasyClub({
    _id: new mongoose.Types.ObjectId(),
    clubName: 'Strikers \'87',
    manager: 'Jim Strother',
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
    manager: 'Daniel Mayberry',
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
    manager: 'Ryan Pritchett',
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
    manager: 'Mark Enders',
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
    manager: 'Shaun Kendall',
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
    manager: 'N/A'
  });

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
	firstClub,
	secondClub,
	thirdClub,
	fourthClub,
	fifthClub,
	sixthClub
};