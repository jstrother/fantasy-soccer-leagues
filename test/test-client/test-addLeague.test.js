import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import { SELECT_LEAGUE, addLeague } from '../../flow/subActions/userActions.js';

const middlewares = [thunk],
  mockStore = configureMockStore(middlewares),
  config = require('../../server/config.js'),
  accessToken = `${config.GOOGLE_ACCESSTOKEN}`,
  fantasyLeagueId = 779,
  fantasyLeagueName = 'Major League Soccer (USA)';

describe('addLeague async action', () => {
  it('should add league id and name to store', () => {
    const leagueNock = nock('https://fantasy-soccer-leagues-jstrother.c9users.io', {
      reqheaders: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .put('/user/addLeague')
    .reply(200, function(uri, body) {
      return body;
    }),
    store = mockStore({ fantasyLeagueId: undefined, fantasyLeagueName: undefined });
    
    return store.dispatch(addLeague(accessToken, fantasyLeagueId, fantasyLeagueName)).then((fantasyLeagueId, fantasyLeagueName) => {
      expect(store.getState()).toHaveProperty('fantasyLeagueId', fantasyLeagueId);
      expect(store.getState()).toHaveProperty('fantasyLeagueName', fantasyLeagueName);
    });
  });
});