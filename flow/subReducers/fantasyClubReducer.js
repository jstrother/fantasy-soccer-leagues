// ./flow/subReducers/fantasyClubReducer.js
// imported into ./flow/reducers.js

import { SET_MANAGER_SUCCESS, SET_MANAGER_FAIL, SET_ROSTER_SUCCESS, SET_ROSTER_FAIL, SET_NAME_SUCCESS, SET_NAME_FAIL } from '../subActions/fantasyClubActions.js';

export const fantasyClubReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MANAGER_SUCCESS:
      return Object.assign({}, state,
        {
          manager: action.manager
        }
      );
    case SET_ROSTER_SUCCESS:
      return Object.assign({}, state,
        {
          roster: action.roster
        }
      );
    case SET_NAME_SUCCESS:
      return Object.assign({}, state,
        {
          name: action.name
        }
      );
    case SET_NAME_FAIL:
    case SET_MANAGER_FAIL:
    case SET_ROSTER_FAIL:
    default:
      return state;
  }
};