// ./flow/subReducers/fantasyMatchReducer.js
// imported into ./flow/reducers.js

import { MATCH_RESOLVE_SUCCESS, MATCH_RESOLVE_FAIL } from '../subActions/fantasyMatchActions.js';

export const fantasyMatchReducer = (state = {resolvedMatches: []}, action) => {
  switch (action.type) {
    case MATCH_RESOLVE_SUCCESS:
      return Object.assign({}, state,
        {
          resolvedMatches: action.resolvedMatches
        }
      );
    case MATCH_RESOLVE_FAIL:
    default:
      return state;
  }
};