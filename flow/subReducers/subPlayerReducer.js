// ./flow/subReducers/subPlayerReducer.js
// imported into ./flow/reducers.js

import { SUBSTITUTE_PLAYER, SUBSTITUTE_FAIL } from '../subActions/substituteActions.js';

export const subPlayerReducer = (action, state = {}) => {
  switch (action.type) {
    case SUBSTITUTE_PLAYER:
      return Object.assign({}, state,
      {
        substitute: {
          thisPlayerIn: action.substitute.thisPlayerIn,
          thisPlayerOut: action.substitute.thisPlayerOut
        }
      });
      
    case SUBSTITUTE_FAIL:
      return Object.assign({}, state, {substitute: null});
      
    default:
      return state;
  }
};