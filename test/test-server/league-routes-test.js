const leagueRouter = require('../../server/league-routes.js').leagueRouter,
  { mongoose, chai, chaiHTTP, expect, testPlayer, testPlayer2, testPlayer3, fantasyLeagueId } = require('../common.js'),
  Player = require('../../models/player_model.js'),
  { app } = require('../../server/server.js');

chai.use(chaiHTTP);
mongoose.Promise = Promise;

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