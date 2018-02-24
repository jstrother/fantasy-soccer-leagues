import { SHOW_ROSTER_WARNING, hideRosterWarning } from '../subActions/rosterWarningAction.js';

export const warningFadeMiddleware = store => next => action => {
  if (action.type === SHOW_ROSTER_WARNING) {
    action.timeout = setTimeout(() => store.dispatch(hideRosterWarning()), 7000);
  }
  else {
    clearTimeout(action.timeout);
  }
  next(action);
};