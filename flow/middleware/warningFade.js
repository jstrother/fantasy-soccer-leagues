import { SHOW_ROSTER_WARNING } from '../subActions/rosterWarningAction.js';

export const warningFadeMiddleware = store => next => action => {
  if (action.type === SHOW_ROSTER_WARNING) {
    action.timeout = setTimeout(() => store.dispatch({type: 'HIDE_ROSTER_WARNING', show: false}), 7000);
  }
  else {
    clearTimeout(action.timeout);
  }
  next(action);
};