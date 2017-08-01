import { SELECT_LEAGUE, LEAGUE_FAIL } from '../subActions/leagueSelectionActions.js';

export const leagueSelectionReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_LEAGUE:
      return Object.assign({}, state,
      {
        league: {
          leagueId: action.league.leagueId,
          leagueName: action.league.leagueName
        },
        firstTime: false
      });
    
    case LEAGUE_FAIL:
      return Object.assign({}, state, {league: null});
    
    default:
      return state;
  }
};