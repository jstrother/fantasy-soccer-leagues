/* eslint-disable no-console */

export const SHOW_STARTING_ELEVEN_ALERT = 'SHOW_STARTING_ELEVEN_ALERT';
export const showStartingElevenAlert = (message, timeout) => ({
  type: SHOW_STARTING_ELEVEN_ALERT,
  message,
  timeout,
  show: true
});

export const HIDE_STARTING_ELEVEN_ALERT = 'HIDE_STARTING_ELEVEN_ALERT';
export const hideStartingElevenAlert = () => ({
  type: HIDE_STARTING_ELEVEN_ALERT,
  show: false
});

export const STARTING_ELEVEN_ALERT_FAIL = 'STARTING_ELEVEN_ALERT_FAIL';
export const startingElevenAlertFail = () => ({
  type: STARTING_ELEVEN_ALERT_FAIL
});

export const startingElevenAlert = message => dispatch => {
  if (!message) {
    dispatch(startingElevenAlertFail());
    return;
  }
  dispatch(showStartingElevenAlert(message));
};