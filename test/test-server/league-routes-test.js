const chai = require('chai'),
  chaiHTTP = require('chai-http'),
  should = chai.should(),
  expect = chai.expect,
  leagueRouter = require('../../server/league-routes.js').leagueRouter,
  { mongoose, dbTestConnection, testPlayer, testPlayer2, testPlayer3, fantasyLeagueId } = require('../common.js'),
  Player = require('../../models/player_model.js'),
  { createData } = require('../../server/programFunctions/crud_functions.js'),
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
    return createData(testPlayer, Player)
    .then(player1 => {
      return createData(testPlayer2, Player)
      .then(player2 => {
        return createData(testPlayer3, Player)
        .then(player3 => {
          return chai.request(app)
          .get(`/league/${fantasyLeagueId}`)
          .then(res => {
            console.log('res.body:', res.body);
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