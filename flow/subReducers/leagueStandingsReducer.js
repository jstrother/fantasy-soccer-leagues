import {LEAGUE_STANDINGS_SUCCESS, LEAGUE_STANDINGS_FAIL} from '../subActions/leagueStandingsActions.js';

const initialState = {
  currentStandings: []
};

export const leagueStandingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEAGUE_STANDINGS_SUCCESS:
      return Object.assign({}, state, 
        {
          currentStandings: action.currentStandings
        }
      );
    case LEAGUE_STANDINGS_FAIL:
    default:
      return state;
  }
};