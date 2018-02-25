/* eslint-disable no-console */

export const SHOW_BENCH_PLAYERS_ALERT = 'SHOW_BENCH_PLAYERS_ALERT';
export const showBenchPlayersAlert = (message, timeout) => ({
  type: SHOW_BENCH_PLAYERS_ALERT,
  message,
  timeout,
  show: true
});

export const HIDE_BENCH_PLAYERS_ALERT = 'HIDE_BENCH_PLAYERS_ALERT';
export const hideBenchPlayersAlert = () => ({
  type: HIDE_BENCH_PLAYERS_ALERT,
  show: false
});

export const BENCH_PLAYERS_ALERT_FAIL = 'BENCH_PLAYERS_ALERT_FAIL';
export const benchPlayersAlertFail = () => ({
  type: BENCH_PLAYERS_ALERT_FAIL
});

export const benchPlayersAlert = message => dispatch => {
  if (!message) {
    dispatch(benchPlayersAlertFail());
    return;
  }
  dispatch(showBenchPlayersAlert(message));
};