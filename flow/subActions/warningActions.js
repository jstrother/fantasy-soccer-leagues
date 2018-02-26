/* eslint-disable no-console */

export const SHOW_WARNING = 'SHOW_WARNING';
export const showWarning = (message, timeout) => ({
  type: SHOW_WARNING,
  message,
  timeout,
  show: true
});

export const HIDE_WARNING = 'HIDE_WARNING';
export const hideWarning = () => ({
  type: HIDE_WARNING,
  show: false
});

export const WARNING_FAIL = 'WARNING_FAIL';
export const warningFail = () => ({
  type: WARNING_FAIL
});

export const warning = message => dispatch=> {
  if (!message) {
    dispatch(warningFail());
    return;
  }
  dispatch(showWarning(message));
};