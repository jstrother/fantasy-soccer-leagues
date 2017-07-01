// ./flow/subReducers/loginReducer.js
// imported into ./flow/reducers.js

import { LOG_IN, SET_USER, SET_USER_FAIL, SET_USER_SUCCESS, fetchUser } from '../actions.js';

export const loginReducer = (state = [], action) => {
  switch (action.type) {
    case LOG_IN:
      return [
        ...state,
        {
          googleId: action.id,
    			displayName: action.displayName,
    			firstName: action.givenName,
    			lastName: action.familyName,
    			userPhoto: action.userPhoto,
          accessToken: action.accessToken
        }
      ];
    default:
      return state;
  }
};