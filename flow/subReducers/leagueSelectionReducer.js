import { SELECT_LEAGUE, LEAGUE_FAIL } from '../subActions/leagueSelectionActions.js';

export const leagueSelectionReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_LEAGUE:
      console.log('action', action);
      return Object.assign({}, state,
      {
        basisLeague: {
          leagueId: action.basisLeague.leagueId,
          leagueName: action.basisLeague.leagueName
        },
        firstTime: false
      });
    
    case LEAGUE_FAIL:
      return Object.assign({}, state, {league: null});
    
    default:
      return state;
  }
};