// ./flow/subReducers/fantasyMatchReducer.js
// imported into ./flow/reducers.js

import { MATCH_RESOLUTION_SUCCESS, MATCH_RESOLUTION_FAIL } from '../subActions/fantasyMatchActions.js';

export const fantasyMatchReducer = (state = {fantasySchedule: {matches: {weeklyMatches: []}}}, action) => {
  switch (action.type) {
    case MATCH_RESOLUTION_SUCCESS: 
      return Object.assign({}, state,
        {
          weeklyMatches: action.weeklyMatches
        }
      );
    case MATCH_RESOLUTION_FAIL:
    default:
      return state;
  }
};