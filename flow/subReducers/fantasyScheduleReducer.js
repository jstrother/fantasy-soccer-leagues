// ./flow/subReducers/fantasyScheduleReducer.js
// imported into ./flow/reducers.js

import { CREATE_SCHEDULE_SUCCESS, CREATE_SCHEDULE_FAIL, GET_SCHEDULE_SUCCESS, GET_SCHEDULE_FAIL } from '../subActions/fantasyScheduleActions.js';

export const fantasyScheduleReducer = (state = {fantasySchedule: null}, action) => {
  switch (action.type) {
    case GET_SCHEDULE_SUCCESS:
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
    case GET_SCHEDULE_FAIL:
    case CREATE_SCHEDULE_FAIL:
    default:
      return state;
  }
};