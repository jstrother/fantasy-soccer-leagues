// ./flow/subReducers/updateRosterReducer.js
// imported into ./flow/reducers.js

import { SELECT_RESERVES, SELECT_BENCHERS, SELECT_STARTERS } from '../actions.js';

export const updateRosterReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_RESERVES:
      
    case SELECT_BENCHERS:
      
    case SELECT_STARTERS:
      
    default:
      return state;
  }
};