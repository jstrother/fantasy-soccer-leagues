import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';

import { selectLeague, addLeague } from '../../flow/subActions/userActions.js';

const middlewares = [thunk],
  mockStore = configureMockStore(middlewares),
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
  
describe('League Selection Actions', () => {
  describe('select league sync action', () => {
    it('selects a league and dispatches the league id and name', () => {
      const expectedAction = 
      {
        type: 'SELECT_LEAGUE',
        fantasyLeagueId: 779,
        fantasyLeagueName: 'Major League Soccer (USA)',
        statusCode: 200
      };
      
      expect(selectLeague(fantasyLeagueId, fantasyLeagueName, 200)).toEqual(expectedAction);
    });
  });
  
  describe('addLeague async action', () => {
    it('should add league id and name to store', () => {
      const leagueNock = nock('https://fantasy-soccer-leagues-jstrother.c9users.io', {
        reqheaders: {
          'Authorization': `Bearer ${testCurrentUser.accessToken}`
        }
      })
      .put('/user/addLeague/2')
      .reply(200, function(uri, body) {
        return body;
      }),
      store = mockStore({ testCurrentUser });
      
      return store.dispatch(addLeague(testCurrentUser.accessToken, fantasyLeagueId, fantasyLeagueName, testCurrentUser.googleId)).then((fantasyLeagueId, fantasyLeagueName) => {
        expect(store.getState()).toHaveProperty('fantasyLeagueId', fantasyLeagueId);
        expect(store.getState()).toHaveProperty('fantasyLeagueName', fantasyLeagueName);
      });
    });
  });
});