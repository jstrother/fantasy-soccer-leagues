// ./flow/subReducers/playerReducer.js
// imported into ./flow/reducers.js

import { PLAYER_DATA_SUCCESS, PLAYER_DATA_FAIL, PLAYER_HIDE_SUCCESS, PLAYER_HIDE_FAIL } from '../subActions/playerActions.js';

export const playerReducer = (state = {show: false}, action) => {
  switch (action.type) {
    case PLAYER_DATA_SUCCESS:
      return Object.assign({}, state, 
        {
          player: action.player,
          show: action.show
        }
      );
    case PLAYER_HIDE_SUCCESS:
      return Object.assign({}, state,
        {
          show: action.show
        }
      );
    case PLAYER_HIDE_FAIL:
    case PLAYER_DATA_FAIL:
    default:
      return state;
  }  
};