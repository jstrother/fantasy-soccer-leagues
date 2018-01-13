// ./flow/subReducers/leagueReducer.js
// imported into ./flow/reducers.js

import { LEAGUE_SUCCESS, LEAGUE_FAIL } from '../subActions/leagueActions.js';

export const leagueReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAGUE_SUCCESS:
      return Object.assign({}, state,
        {
          idFromAPI: action.player.idFromAPI,
          fullName: action.player.fullName,
          position: action.player.position,
          clubName: action.player.clubName
        }
      );
    case LEAGUE_FAIL:
    default:
      return state;
  }
};