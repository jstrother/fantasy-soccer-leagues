// ./flow/subReducers/updateRosterReducer.js
// imported into ./flow/reducers.js

import { SET_AS_RESERVE, SET_AS_BENCHER, SET_AS_STARTER } from '../actions.js';
import { readData } from '../../server/programFunctions/crud_functions.js';

export const updateRosterReducer = (state = [], action) => {
  switch (action.type) {
    // pull from database to fix login error, this reducer is messing with state
    case SET_AS_STARTER:
      let thisPlayer = Object.assign({
        
      });
      return Object.assign({}, state, thisPlayer);
      
    case SET_AS_BENCHER:
      
    case SET_AS_RESERVE:
      
    default:
      return state;
  }
};