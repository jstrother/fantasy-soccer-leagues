import configureStore from 'redux-mock-store';
import {loginReducer} from '../flow/subReducers/loginReducer.js';

const testCurrentUser = {
    googleId: 2,
    displayName: 'Clint Dempsey',
    givenName: 'Clint',
    familyName: 'Dempsey',
    userPhoto: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg'
  },
  testReducer = {
    googleId: 2,
    displayName: 'Clint Dempsey',
    givenName: 'Clint',
    familyName: 'Dempsey',
    userPhoto: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg',
    fantasyLeagueId: 779,
    fantasyLeagueName: "Major League Soccer (USA)"
  },
  selectLeague = {
    type: 'SELECT_LEAGUE',
    fantasyLeagueId: 779,
    fantasyLeagueName: 'Major League Soccer (USA)'
  };
  
test('testing loginReducer', () => {
  expect(loginReducer(testCurrentUser, selectLeague)).toEqual(testReducer)
});