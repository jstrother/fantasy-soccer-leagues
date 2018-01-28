// ./flow/subReducers/playerReducer.js
// imported into ./flow/reducers.js

import { ADD_TO_ROSTER, SET_STARTER_SUCCESS, SET_STARTER_FAIL, SET_BENCHWARMER_SUCCESS, SET_BENCHWARMER_FAIL, SET_RESERVE_SUCCESS, SET_RESERVE_FAIL } from '../subActions/playerActions.js';

export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_ROSTER:
      return Object.assign({}, state, 
        {
          idFromA
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
    case SET_BENCHWARMER_FAIL:
    case SET_STARTER_FAIL:    
    case SET_RESERVE_FAIL:
    default:
      return state;
  }  
};