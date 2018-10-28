// ./flow/subReducers/loginReducer.js
// imported into ./flow/reducers.js

import { SET_USER_FAIL, SET_USER_SUCCESS, SET_LEAGUE_SUCCESS, SET_LEAGUE_FAIL, HAS_CLUB_SUCCESS, HAS_CLUB_FAIL } from '../subActions/userActions.js';

export const userReducer = (state = {hasClub: false}, action) => {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return Object.assign({}, state, 
        {
          userId: action.currentUser.userId,
          accessToken: action.currentUser.accessToken,
          googleId: action.currentUser.googleId,
          displayName: action.currentUser.displayName,
          givenName: action.currentUser.givenName,
          familyName: action.currentUser.familyName,
          userPhoto: action.currentUser.userPhoto,
          fantasyLeagueId: action.currentUser.fantasyLeagueId,
          fantasyLeagueName: action.currentUser.fantasyLeagueName,
          hasClub: action.currentUser.hasClub
        }
      );
    case SET_LEAGUE_SUCCESS:
      return Object.assign({}, state,
        {
          userId: action.userId,
          fantasyLeagueId: action.fantasyLeagueId,
          fantasyLeagueName: action.fantasyLeagueName
        }
      );
    case HAS_CLUB_SUCCESS:
      return Object.assign({}, state,
        {
          userId: action.userId,
          hasClub: action.hasClub
        }
      );
    case SET_USER_FAIL:
    case SET_LEAGUE_FAIL:
    case HAS_CLUB_FAIL:
    default:
      return state;
  }
};