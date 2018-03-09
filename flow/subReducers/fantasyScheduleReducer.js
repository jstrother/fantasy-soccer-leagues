// ./flow/subReducers/fantasyScheduleReducer.js
// imported into ./flow/reducers.js

import { POPULATE_SCHEDULE_SUCCESS, POPULATE_SCHEDULE_FAIL, POPULATE_MATCHES_SUCCESS, POPULATE_MATCHES_FAIL, CREATE_SCHEDULE_SUCCESS, CREATE_SCHEDULE_FAIL } from '../subActions/fantasyScheduleActions.js';

export const fantasyScheduleReducer = (state = {fantasySchedule: []}, action) => {
  switch (action.type) {
    case POPULATE_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        {
          fantasySchedule: action.fantasySchedule
        }
      );
    case POPULATE_MATCHES_SUCCESS:
      return Object.assign({}, state,
        {
          fantasySchedule: action.fantasySchedule
        }
      );
    case CREATE_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        {
          fantasySchedule: action.fantasySchedule
        }
      );
    case POPULATE_SCHEDULE_FAIL:
    case POPULATE_MATCHES_FAIL:
    case CREATE_SCHEDULE_FAIL:
    default:
      return state;
  }
};