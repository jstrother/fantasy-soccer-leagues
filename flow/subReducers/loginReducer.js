// ./flow/subReducers/loginReducer.js
// imported into ./flow/reducers.js

import { SET_USER_FAIL, SET_USER_SUCCESS, SELECT_LEAGUE } from '../subActions/userActions.js';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return Object.assign({}, state, 
        {
          googleId: action.currentUser.googleId,
          displayName: action.currentUser.displayName,
          givenName: action.currentUser.givenName,
          familyName: action.currentUser.familyName,
          userPhoto: action.currentUser.userPhoto
        }
      );
    case SELECT_LEAGUE:
      return Object.assign({}, state,
        {
          fantasyLeagueId: action.fantasyLeagueId,
          fantasyLeagueName: action.fantasyLeagueName
        }
      );
    case SET_USER_FAIL:
      return Object.assign({}, state, { currentUser: null });
    default:
      return state;
  }
};

// need to find the correct file for the following code block
// User.findOneAndUpdate({
// 	googleId: this.profile.id
// },
// {
// 	fantasyLeagueId: this.fantasyLeagueId,
// 	fantasyLeagueName: this.fantasyLeagueName
// })
// .then(user => {
//  callback(null, user);
// })
// .catch(error => {
// 	throw new Error(error);
// });
