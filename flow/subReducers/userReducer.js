// ./flow/subReducers/loginReducer.js
// imported into ./flow/reducers.js

import { SET_USER_FAIL, SET_USER_SUCCESS, SET_LEAGUE_SUCCESS, SET_LEAGUE_FAIL, SET_CLUB_SUCCESS, SET_CLUB_FAIL } from '../subActions/userActions.js';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return Object.assign({}, state, 
        {
          accessToken: action.currentUser.accessToken,
          googleId: action.currentUser.googleId,
          displayName: action.currentUser.displayName,
          givenName: action.currentUser.givenName,
          familyName: action.currentUser.familyName,
          userPhoto: action.currentUser.userPhoto,
          fantasyLeagueId: action.currentUser.fantasyLeagueId,
          fantasyLeagueName: action.currentUser.fantasyLeagueName
        }
      );
    case SET_LEAGUE_SUCCESS:
      return Object.assign({}, state,
        {
          fantasyLeagueId: action.fantasyLeagueId,
          fantasyLeagueName: action.fantasyLeagueName
        }
      );
    case SET_CLUB_SUCCESS:
      return Object.assign({}, state,
        {
          fantasyClub: action.fantasyClub
        }
      );
    case SET_USER_FAIL:
    case SET_LEAGUE_FAIL:
    case SET_CLUB_FAIL:
    default:
      return state;
  }
};