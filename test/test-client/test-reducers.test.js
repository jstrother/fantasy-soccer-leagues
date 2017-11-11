import configureMockStore from 'redux-mock-store';
import { loginReducer } from '../../flow/subReducers/loginReducer.js';
import { setUserSuccess, selectLeague } from '../../flow/subActions/userActions.js';
import expect from 'expect';

const middlewares = [],
  mockStore = configureMockStore(middlewares),
  testCurrentUser = {
    displayName: 'Clint Dempsey',
    givenName: 'Clint',
    familyName: 'Dempsey',
    userPhoto: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg',
    googleId: 2
  },
  fantasyLeagueId = 779,
  fantasyLeagueName = 'Major League Soccer (USA)',
  userWithLeague = {
    displayName: 'Clint Dempsey',
    givenName: 'Clint',
    familyName: 'Dempsey',
    userPhoto: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg',
    googleId: 2,
    fantasyLeagueId,
    fantasyLeagueName
  };
  
describe('Tests LoginReducer', () => {
  it('should log a user into app', () => {
    expect(loginReducer(setUserSuccess(testCurrentUser, 200))).toBeTruthy;
  });
  
  it('should add a league to a user profile', () => {
    expect(loginReducer(selectLeague(fantasyLeagueId, fantasyLeagueName, 200))).toEqual(userWithLeague);
  });
});