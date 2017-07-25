// ./flow/subReducers/subPlayerReducer.js
// imported into ./flow/reducers.js

import { SUBSTITUTE_PLAYER, SUBSTITUTE_FAIL } from '../subActions/substituteActions.js';

export const subPlayerReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSTITUTE_PLAYER:
      let thisPlayerOut = action.playerOut,
        thisPlayerIn = action.playerIn,
        substitute = {
          thisPlayerIn,
          thisPlayerOut
        };
      return Object.assign({}, state, substitute);
      
    case SUBSTITUTE_FAIL:
      return Object.assign({}, state, {substitute: null});
      
    default:
      return state;
  }
};