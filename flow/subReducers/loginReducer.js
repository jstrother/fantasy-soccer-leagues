// ./flow/subReducers/loginReducer.js
// imported into ./flow/reducers.js

import { SET_USER_FAIL, SET_USER_SUCCESS, SELECT_LEAGUE } from '../subActions/userActions.js';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return Object.assign({}, state, 
        {
          currentUser: {
            googleId: action.currentUser.googleId,
            displayName: action.currentUser.displayName,
            givenName: action.currentUser.givenName,
            familyName: action.currentUser.familyName,
            userPhoto: action.currentUser.userPhoto
          }
        }
      );
    case SELECT_LEAGUE:
      return Object.assign({}, state,
        {
          currentUser: {
            fantasyLeagueId: action.currentUser.fantasyLeagueId,
            fantasyLeagueName: action.currentUser.fantasyLeagueName
          }
        }
      );
    case SET_USER_FAIL:
      return Object.assign({}, state, { currentUser: null });
    default:
      return state;
  }
};