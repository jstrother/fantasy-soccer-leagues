/* eslint-disable no-console */

export const SHOW_ROSTER_WARNING = 'SHOW_ROSTER_WARNING';
export const showRosterWarning = (message, timeout) => ({
  type: SHOW_ROSTER_WARNING,
  message,
  timeout,
  show: true
});

export const ROSTER_WARNING_FAIL = 'ROSTER_WARNING_FAIL';
export const rosterWarningFail = () => ({
  type: ROSTER_WARNING_FAIL
});

export const rosterWarning = message => dispatch=> {
  if (!message) {
    dispatch(rosterWarningFail());
    return;
  }
  dispatch(showRosterWarning(message));
};