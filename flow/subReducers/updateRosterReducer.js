// ./flow/subReducers/updateRosterReducer.js
// imported into ./flow/reducers.js

import { SET_AS_STARTER, STARTER_FAIL } from '../subActions/starterActions.js';
import { SET_AS_BENCHER, BENCHER_FAIL } from '../subActions/bencherActions.js';
import { SET_AS_RESERVE, RESERVE_FAIL } from '../subActions/reserveActions.js';

export const updateRosterReducer = (action, state = {}) => {
  switch (action.type) {
    case SET_AS_STARTER:
      return Object.assign({}, state, 
        {
          thisStarter: {
            player: action.thisStarter.player
          }
        });
        
    case SET_AS_BENCHER:
      return Object.assign({}, state, 
        {
          thisBencher: {
            player: action.thisBencher.player
          }
        });
        
    case SET_AS_RESERVE:
      return Object.assign({}, state, 
        {
          thisReserve: {
            player: action.thisReserve.player
          }
        });
    
    case STARTER_FAIL:
    case BENCHER_FAIL:  
    case RESERVE_FAIL:
      return Object.assign({}, state, {thisReserve: null});
      
    default:
      return state;
  }
};