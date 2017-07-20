// ./flow/subReducers/loginReducer.js
// imported into ./flow/reducers.js

import { SET_USER_FAIL, SET_USER_SUCCESS } from '../actions.js';

export const loginReducer = (state = [], action) => {
  console.log('loginReducer state:', state);
  switch (action.type) {
    case SET_USER_SUCCESS:
      // console.log('sus:', state);
      console.log(Object.assign({}, state, 
        {
          currentUser: {
            googleId: action.currentUser.googleId,
            displayName: action.currentUser.displayName,
            givenName: action.currentUser.givenName,
            familyName: action.currentUser.familyName,
            userPhoto: action.currentUser.userPhoto
          }
        }
      ));
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
    case SET_USER_FAIL:
      console.log(Object.assign({}, state, { currentUser: null }));
      return Object.assign({}, state, { currentUser: null });
    default:
      return state;
  }
};