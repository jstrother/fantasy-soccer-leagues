import {SHOW_STARTING_ELEVEN_ALERT, HIDE_STARTING_ELEVEN_ALERT, STARTING_ELEVEN_ALERT_FAIL } from '../subActions/startingElevenAlertActions.js';

export const startingElevenAlertReducer = (state = {message: null, timeout: null, show: false}, action) => {
  switch (action.type) {
    case SHOW_STARTING_ELEVEN_ALERT:
      return Object.assign({}, state,
        {
          message: action.message,
          timeout: action.timeout,
          show: action.show
        }
      );
    case HIDE_STARTING_ELEVEN_ALERT:
      return Object.assign({}, state,
        {
          show: action.show
        }
      );
    
    case STARTING_ELEVEN_ALERT_FAIL:
    default:
      return state;
  }
};