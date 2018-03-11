import { SHOW_WARNING, HIDE_WARNING, WARNING_FAIL } from '../subActions/warningActions.js';

export const warningReducer = (state = {message: null, timeout: null, show: false}, action) => {
  switch (action.type) {
    case SHOW_WARNING:
      return Object.assign({}, state,
        {
          message: action.message,
          timeout: action.timeout,
          show: action.show
        }
      );
    case HIDE_WARNING:
      return Object.assign({}, state,
        {
          show: action.show
        }
      );
    case WARNING_FAIL:
    default:
      return state;
  }
};