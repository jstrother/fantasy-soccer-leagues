const chai = require('chai'),
  chaiHTTP = require('chai-http'),
  should = chai.should(),
  expect = chai.expect,
  playerRoutes = require('../../server/player-routes.js'),
  { mongoose, dbTestConnection } = require('../common.js'),
  Player = require('../../models/player_model.js'),
  { createData, readData, deleteData } = require('../../server/programFunctions/crud_functions.js'),
  { closeServer, runServer, app } = require('../../server/server.js'),
  testPlayer = {
    idFromApi: 1,
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
  };

chai.use(chaiHTTP);
mongoose.Promise = Promise;

before(() => {
  runServer(8081, dbTestConnection);
  createData(testPlayer, Player);
});

after(() => {
  deleteData(testPlayer, Player);
  closeServer();
});

describe('Player Info',() => {
  it('should return player info from database', () => {
    return readData({'idFromApi': testPlayer.idFromApi}, Player)
      .then((data) => {
        console.log('test data:', data);
      });
  });
});