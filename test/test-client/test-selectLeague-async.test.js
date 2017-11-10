import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import nock from 'nock';

import { SELECT_LEAGUE, addLeague } from '../../flow/subActions/userActions.js';

const middlewares = [thunk],
  mockStore = configureMockStore(middlewares),
  config = require('../../server/config.js'),
  testCurrentUser = {
  	accessToken: 1974,
	  displayName: 'Clint Dempsey',
	  givenName: 'Clint',
	  familyName: 'Dempsey',
	  userPhoto: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg',
	  googleId: 2
  },
  fantasyLeagueId = 779,
  fantasyLeagueName = 'Major League Soccer (USA)';
  
describe('select league async action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  
  it('selects a league and dispatches the league id and name', () => {
    fetchMock.putOnce(`https://fantasy-soccer-leagues-jstrother.c9users.io/user/addLeague/${testCurrentUser.googleId}`, {
      body: JSON.stringify({
        fantasyLeagueId,
        fantasyLeagueName
      }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${testCurrentUser.accessToken}`
      }
    })
    .catch(error => {
      throw new Error(error);
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
    
    return store.dispatch(addLeague(testCurrentUser.accessToken, fantasyLeagueId, fantasyLeagueName, testCurrentUser.googleId))
    .then((fantasyLeagueId, fantasyLeagueName) => {
      expect(store.getActions()).toHaveProperty('fantasyLeagueId', fantasyLeagueId);
      expect(store.getActions()).toHaveProperty('fantasyLeagueName', fantasyLeagueName);
    });
  });
});