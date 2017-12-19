const mongoose = require('mongoose'),
	chai = require('chai'),
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
  fantasyLeagueName = 'Major League Soccer (USA)';

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
	fantasyLeagueName
};