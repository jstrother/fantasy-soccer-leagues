/* eslint-disable no-console */

import { CHECK_SCHEDULE_SUCCESS, getSchedule, createSchedule } from '../subActions/fantasyScheduleActions.js';

export const fantasyScheduleCheckMiddleware = store => next => action => {
  console.log('action.matches:', action.matches);
  if (action.type === CHECK_SCHEDULE_SUCCESS && action.matches) {
    action.timeout = setTimeout(() => store.dispatch(getSchedule()), 7000);
  }
  else if (action.type === CHECK_SCHEDULE_SUCCESS && !action.matches) {
    store.dispatch(createSchedule());
  }
  next(action);
};