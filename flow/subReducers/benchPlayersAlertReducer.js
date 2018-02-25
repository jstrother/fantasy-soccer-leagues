import {SHOW_BENCH_PLAYERS_ALERT, HIDE_BENCH_PLAYERS_ALERT, BENCH_PLAYERS_ALERT_FAIL } from '../subActions/benchPlayersAlertActions.js';

export const benchPlayersAlertReducer = (state = {message: null, timeout: null, show: false}, action) => {
  switch (action.type) {
    case SHOW_BENCH_PLAYERS_ALERT:
      return Object.assign({}, state,
        {
          message: action.message,
          timeout: action.timeout,
          show: action.show
        }
      );
    case HIDE_BENCH_PLAYERS_ALERT:
      return Object.assign({}, state,
        {
          show: action.show
        }
      );
    
    case BENCH_PLAYERS_ALERT_FAIL:
    default:
      return state;
  }
};