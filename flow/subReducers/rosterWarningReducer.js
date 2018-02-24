import { SHOW_ROSTER_WARNING, HIDE_ROSTER_WARNING, ROSTER_WARNING_FAIL } from '../subActions/rosterWarningAction.js';

export const rosterWarningReducer = (state = {message: null, timeout: null, show: false}, action) => {
  switch (action.type) {
    case SHOW_ROSTER_WARNING:
      return Object.assign({}, state,
        {
          message: action.message,
          timeout: action.timeout,
          show: action.show
        }
      );
    case HIDE_ROSTER_WARNING:
      return Object.assign({}, state,
        {
          show: action.show
        }
      );
    case ROSTER_WARNING_FAIL:
    default:
      return state;
  }
};