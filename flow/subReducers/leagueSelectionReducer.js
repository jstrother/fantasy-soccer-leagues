import { SELECT_LEAGUE, LEAGUE_FAIL } from '../subActions/leagueSelectionActions.js';

export const leagueSelectionReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_LEAGUE:
      return Object.assign({}, state,
      {
        thisLeague: {
          leagueId: action.league.leagueId,
          leagueName: action.league.leagueName
        }
      });
    
    case LEAGUE_FAIL:
      return Object.assign({}, state, {league: null});
    
    default:
      return state;
  }
};