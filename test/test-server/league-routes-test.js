const chai = require('chai'),
  chaiHTTP = require('chai-http'),
  should = chai.should(),
  expect = chai.expect,
  leagueRouter = require('../../server/league-routes.js').leagueRouter,
  { mongoose, dbTestConnection, testPlayer, testPlayer2, testPlayer3, fantasyLeagueId } = require('../common.js'),
  Player = require('../../models/player_model.js'),
  { closeServer, runServer, app } = require('../../server/server.js');

chai.use(chaiHTTP);
mongoose.Promise = Promise;

before(() => {
  runServer(8081, dbTestConnection);
});

after(() => {
  closeServer();
});

describe('Players by League', () => {
  it('should return a list of players based upon leagueId', () => {
    return Player.create(testPlayer)
    .then(player1 => {
      return Player.create(testPlayer2)
      .then(player2 => {
        return Player.create(testPlayer3)
        .then(player3 => {
          return chai.request(app)
          .get(`/league/${fantasyLeagueId}`)
          .then(res => {
            expect(res.body).to.not.be.empty;
          });
        });
      });
    })
    .catch(error => {
      throw new Error(error);
    });
  });
});