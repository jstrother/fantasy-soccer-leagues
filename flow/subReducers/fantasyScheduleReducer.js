// ./flow/subReducers/fantasyScheduleReducer.js
// imported into ./flow/reducers.js

import { POPULATE_SCHEDULE_SUCCESS, POPULATE_SCHEDULE_FAIL, POPULATE_MATCHES_SUCCESS, POPULATE_MATCHES_FAIL, CREATE_SCHEDULE_SUCCESS, CREATE_SCHEDULE_FAIL, GET_SCHEDULE_SUCCESS, GET_SCHEDULE_FAIL } from '../subActions/fantasyScheduleActions.js';

export const fantasyScheduleReducer = (state = {fantasySchedule: {matches: []}}, action) => {
  switch (action.type) {
    case GET_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        {
          fantasySchedule: {
            matches: action.matches
          }
        }
      );
    case POPULATE_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        {
          fantasySchedule: {
            matches: action.matches
          }
        }
      );
    case POPULATE_MATCHES_SUCCESS:
      return Object.assign({}, state,
        {
          fantasySchedule: {
            matches: action.matches
          }
        }
      );
    case CREATE_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        {
          fantasySchedule: {
            matches: action.matches
          }
        }
      );
    case GET_SCHEDULE_FAIL:
    case POPULATE_SCHEDULE_FAIL:
    case POPULATE_MATCHES_FAIL:
    case CREATE_SCHEDULE_FAIL:
    default:
      return state;
  }
};