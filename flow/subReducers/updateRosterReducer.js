// ./flow/subReducers/updateRosterReducer.js
// imported into ./flow/reducers.js

import { SET_AS_STARTER, STARTER_FAIL } from '../subActions/starterActions.js';
import { SET_AS_BENCHER, BENCHER_FAIL } from '../subActions/bencherActions.js';
import { SET_AS_RESERVE, RESERVE_FAIL } from '../subActions/reserveActions.js';
import { readData } from '../../server/programFunctions/crud_functions.js';
import Player from '../../models/player_model.js';

export const updateRosterReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_AS_STARTER:
      let thisStarter = readData({idFromAPI: action.idFromAPI}, Player);
      return Object.assign({}, state, thisStarter);
    
    case STARTER_FAIL:
      return Object.assign({}, state, {thisStarter: null});
      
    case SET_AS_BENCHER:
      let thisBencher = readData({idFromAPI: action.idFromAPI}, Player);
      return Object.assign({}, state, thisBencher);
      
    case BENCHER_FAIL:
      return Object.assign({}, state, {thisBencher: null});
      
    case SET_AS_RESERVE:
      let thisReserve = readData({idFromAPI: action.idFromAPI}, Player);
      return Object.assign({}, state, thisReserve);
      
    case RESERVE_FAIL:
      return Object.assign({}, state, {thisReserve: null});
      
    default:
      return state;
  }
};