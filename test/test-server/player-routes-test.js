const chai = require('chai'),
  chaiHTTP = require('chai-http'),
  should = chai.should(),
  expect = chai.expect,
  playerRouter = require('../../server/player-routes.js').playerRouter,
  { mongoose, dbTestConnection, testPlayer } = require('../common.js'),
  Player = require('../../models/player_model.js'),
  { createData } = require('../../server/programFunctions/crud_functions.js'),
  { closeServer, runServer, app } = require('../../server/server.js');

chai.use(chaiHTTP);
mongoose.Promise = Promise;

before(() => {
  runServer(8081, dbTestConnection);
});

after(done => {
	mongoose.connection.db.dropDatabase(done);
	closeServer();
});

describe('Player Info', () => {
   it('should return player info from database', () => {
    return createData(testPlayer, Player)
    .then(player => {
      
      return chai.request(app)
      .get(`/player/${player.idFromAPI}`)
      .then(res => {
        const body = res.body,
          stats = body.stats;
        
        expect(body).to.exist;
        expect(body).to.have.property('idFromAPI');
        expect(body).to.have.property('commonName');
        expect(body).to.have.property('fullName');
        expect(body).to.have.property('firstName');
        expect(body).to.have.property('lastName');
        expect(body).to.have.property('position');
        expect(body).to.have.property('picture');
        expect(body).to.have.property('leagueId');
        expect(body).to.have.property('clubName');
        expect(body).to.have.property('clubId');
        expect(body).to.have.property('fantasyPoints');
        expect(body.fantasyPoints).to.have.property('fixture');
        expect(body.fantasyPoints).to.have.property('season');
        expect(body).to.have.property('stats');
        expect(stats).to.have.property('other');
        expect(stats.other).to.have.property('assists');
        expect(stats.other).to.have.property('offsides');
        expect(stats.other).to.have.property('saves');
        expect(stats.other).to.have.property('penaltiesScored');
        expect(stats.other).to.have.property('penaltiesMissed');
        expect(stats.other).to.have.property('penaltiesSaved');
        expect(stats.other).to.have.property('tackles');
        expect(stats.other).to.have.property('blocks');
        expect(stats.other).to.have.property('interceptions');
        expect(stats.other).to.have.property('clearances');
        expect(stats.other).to.have.property('minutesPlayed');
        expect(stats).to.have.property('passing');
        expect(stats.passing).to.have.property('totalCrosses');
        expect(stats.passing).to.have.property('crossingAccuracy');
        expect(stats.passing).to.have.property('totalPasses');
        expect(stats.passing).to.have.property('passingAccuracy');
        expect(stats).to.have.property('cards');
        expect(stats.cards).to.have.property('yellowCards');
        expect(stats.cards).to.have.property('redCards');
        expect(stats).to.have.property('fouls');
        expect(stats.fouls).to.have.property('drawn');
        expect(stats.fouls).to.have.property('committed');
        expect(stats).to.have.property('goals');
        expect(stats.goals).to.have.property('scored');
        expect(stats.goals).to.have.property('conceded');
        expect(stats.goals).to.have.property('ownGoals');
        expect(stats).to.have.property('shots');
        expect(stats.shots).to.have.property('shotsTotal');
        expect(stats.shots).to.have.property('shotsOnGoal');
      });
    })
    .catch(error => {
      throw new Error(error);
    });
  });
});