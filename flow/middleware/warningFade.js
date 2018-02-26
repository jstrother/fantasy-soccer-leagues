import { SHOW_WARNING, hideWarning } from '../subActions/warningActions.js';

export const warningFadeMiddleware = store => next => action => {
  if (action.type === SHOW_WARNING) {
    action.timeout = setTimeout(() => store.dispatch(hideWarning()), 7000);
  }
  else {
    clearTimeout(action.timeout);
  }
  next(action);
};