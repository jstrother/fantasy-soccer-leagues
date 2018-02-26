// ./flow/subReducers/playerReducer.js
// imported into ./flow/reducers.js

import { PLAYER_DATA_SUCCESS, PLAYER_DATA_FAIL } from '../subActions/playerActions.js';

export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_DATA_SUCCESS:
      return Object.assign({}, state, 
        {
          player: action.player
        }
      );
    case PLAYER_DATA_FAIL:
    default:
      return state;
  }  
};