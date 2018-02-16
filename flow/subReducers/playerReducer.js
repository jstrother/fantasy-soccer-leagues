// ./flow/subReducers/playerReducer.js
// imported into ./flow/reducers.js

import { ROSTER_PLAYER_DATA_SUCCESS, ROSTER_PLAYER_DATA_FAIL, SET_STARTER_SUCCESS, SET_STARTER_FAIL, SET_BENCHWARMER_SUCCESS, SET_BENCHWARMER_FAIL, SET_RESERVE_SUCCESS, SET_RESERVE_FAIL } from '../subActions/playerActions.js';

export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case ROSTER_PLAYER_DATA_SUCCESS:
      return Object.assign({}, state, 
        {
          player: action.player
        }
      );
    case SET_STARTER_SUCCESS:
      return Object.assign({}, state,
        {
          idFromAPI: action.player.idFromAPI
        }
      );
    case SET_BENCHWARMER_SUCCESS:
      return Object.assign({}, state,
        {
          idFromAPI: action.player.idFromAPI
        }
      );
    case SET_RESERVE_SUCCESS:
      return Object.assign({}, state,
        {
          idFromAPI: action.player.idFromAPI
        }
      );
    case ROSTER_PLAYER_DATA_FAIL:
    case SET_BENCHWARMER_FAIL:
    case SET_STARTER_FAIL:    
    case SET_RESERVE_FAIL:
    default:
      return state;
  }  
};