import { SHOW_ROSTER_WARNING, ROSTER_WARNING_FAIL } from '../subActions/rosterWarningAction.js';

export const rosterWarningReducer = (state = {message: null}, action) => {
  switch (action.type) {
    case SHOW_ROSTER_WARNING:
      return Object.assign({}, state,
        {
          message: action.message
        }
      );
    case ROSTER_WARNING_FAIL:
    default:
      return state;
  }
};