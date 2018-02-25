/*eslint-disable no-console, no-unused-vars*/
import { SHOW_STARTING_ELEVEN_ALERT, hideStartingElevenAlert } from '../subActions/startingElevenAlertActions.js';

export const startingElevenAlertMiddleware = store => next => action => {
  if (action.type === SHOW_STARTING_ELEVEN_ALERT) {
    action.timeout = setTimeout(() => store.dispatch(hideStartingElevenAlert()), 7000);
  }
  else {
    clearTimeout(action.timeout);
  }
  next(action);
};