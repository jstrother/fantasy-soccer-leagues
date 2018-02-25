import { SHOW_BENCH_PLAYERS_ALERT, hideBenchPlayersAlert } from '../subActions/benchPlayersAlertActions.js';

export const benchPlayersAlertMiddleware = store => next => action => {
  if (action.type === SHOW_BENCH_PLAYERS_ALERT) {
    action.timeout = setTimeout(() => store.dispatch(hideBenchPlayersAlert()), 7000);
  }
  else {
    clearTimeout(action.timeout);
  }
  next(action);
};