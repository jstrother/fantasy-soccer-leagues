import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import nock from 'nock';

import { SELECT_LEAGUE, addLeague } from '../../flow/subActions/userActions.js';

const middlewares = [thunk],
  mockStore = configureMockStore(middlewares),
  config = require('../../server/config.js'),
  accessToken = `${config.GOOGLE_ACCESSTOKEN}`,
  fantasyLeagueId = 779,
  fantasyLeagueName = 'Major League Soccer (USA)';
  
describe('select league async action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  
  it('selects a league and sets the league id and name', () => {
    fetchMock.putOnce('/user', {
      body: {
          fantasyLeagueId,
          fantasyLeagueName
        },
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const selectLeague = (fantasyLeagueId, fantasyLeagueName) => ({
      type: SELECT_LEAGUE,
      fantasyLeagueId,
      fantasyLeagueName
    }),
    expectedAction = 
    {
      type: SELECT_LEAGUE,
      fantasyLeagueId,
      fantasyLeagueName
    },
    store = mockStore({ fantasyLeagueId: undefined, fantasyLeagueName: undefined });
    
    return store.dispatch(addLeague(accessToken)).then((fantasyLeagueId, fantasyLeagueName) => {
      expect(store.getActions()).toHaveProperty('fantasyLeagueId', fantasyLeagueId);
      expect(store.getActions()).toHaveProperty('fantasyLeagueName', fantasyLeagueName);
    });
  });
});

describe('testing SELECT_LEAGUE async with node-nock', () => {
  it('puts league id and name into database', () => {
    const fantasyLeagueId = 779,
      fantasyLeagueName = 'Major League Soccer (USA)',
      testDB = nock('https://fantasy-soccer-leagues-jstrother.c9users.io')
        .put('/user')
        .reply(200, {
          fantasyLeagueId,
          fantasyLeagueName
        });
    
  });
});