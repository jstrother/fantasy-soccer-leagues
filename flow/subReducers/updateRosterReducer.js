// ./flow/subReducers/updateRosterReducer.js
// imported into ./flow/reducers.js

import { SET_AS_RESERVE, SET_AS_BENCHER, SET_AS_STARTER, SUBSTITUTE_PLAYER } from '../rosterActions.js';
import { readData } from '../../server/programFunctions/crud_functions.js';
import Player from '../../models/player_model.js';

export const updateRosterReducer = (state = [], action) => {
  switch (action.type) {
    // pull from database to fix login error, this reducer is messing with state
    case SET_AS_STARTER:
      let thisStarter = readData({idFromAPI: thisStarter.idFromAPI}, Player);
      return Object.assign({}, state, thisStarter);
      
    case SET_AS_BENCHER:
      let thisBencher = readData({idFromAPI: thisBencher.idFromAPI}, Player);
      return Object.assign({}, state, thisBencher);
      
    case SET_AS_RESERVE:
      let thisReserve = readData({idFromAPI: thisReserve.idFromAPI}, Player);
      return Object.assign({}, state, thisReserve);
      
    case SUBSTITUTE_PLAYER:
      let playerOut = readData({idFromAPI: playerOut.idFromAPI}, Player),
        playerIn = readData({idFromAPI: playerIn.idFromAPI}, Player),
        substitute = {
          playerOut,
          playerIn
        };
      return Object.assign({}, state, substitute);
      
    default:
      return state;
  }
};