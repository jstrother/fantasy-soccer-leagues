// ./flow/subReducers/updateRosterReducer.js
// imported into ./flow/reducers.js

import { SELECT_RESERVES, SELECT_BENCHERS, SELECT_STARTERS } from '../actions.js';

export const updateRosterReducer = (state = [], action) => {
  switch (action.type) {
    // pull from database to fix login error, this reducer is messing with state
    case SELECT_RESERVES:
      
    case SELECT_BENCHERS:
      
    case SELECT_STARTERS:
      
    default:
      return state;
  }
};