// ./flow/subReducers/leagueReducer.js
// imported into ./flow/reducers.js

import { LEAGUE_SUCCESS, LEAGUE_FAIL, PLAYER_POSITION_SELECT } from '../subActions/leagueActions.js';

export const leagueReducer = (state = {position: 'allPositions'}, action) => {
  switch (action.type) {
    case LEAGUE_SUCCESS:
      return Object.assign({}, state,
        {
          playerList: action.playerList
        }
      );
    case PLAYER_POSITION_SELECT:
      return Object.assign({}, state,
        {
          position: action.position
        }
      );
    case LEAGUE_FAIL:
    default:
      return state;
  }
};