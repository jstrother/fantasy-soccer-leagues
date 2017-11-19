import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import { userLeague } from '../../flow/subActions/userActions.js';

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
  
describe('User Action', () => {
  describe('gets a user\'s league', () => {
    it('from the database', () => {
      const userNock = nock('https://fantasy-soccer-leagues-jstrother.c9users.io', {
        reqheaders: {
            'Authorization': `Bearer ${testCurrentUser.accessToken}`
          }
        })
        .get(`/user/league/${testCurrentUser.googleId}`)
        .reply(200, {
          fantasyLeagueId: 779,
          fantasyLeagueName: 'Major League Soccer (USA)'
        }),
        // userLeagueNock = nock('https://fantasy-soccer-leagues-jstrother.c9users.io', {
        //   reqheaders: {
        //       'Authorization': `Bearer ${testCurrentUser.accessToken}`
        //     }
        //   })
        //   .get(`/user/league${testCurrentUser.googleId}`)
        //   .reply(200, {
        //     fantasyLeagueId: 779,
        //     fantasyLeagueName: 'Major League Soccer (USA)'
        //   }),
        store = mockStore({});
      
      store.dispatch(userLeague(testCurrentUser.accessToken, testCurrentUser.googleId));
      
      expect(store.getState()).toHaveProperty('fantasyLeagueId', fantasyLeagueId);
    });
  });
});