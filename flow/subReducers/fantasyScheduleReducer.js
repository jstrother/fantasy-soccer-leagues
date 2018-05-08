// ./flow/subReducers/fantasyScheduleReducer.js
// imported into ./flow/reducers.js

import { CREATE_SCHEDULE_SUCCESS, CREATE_SCHEDULE_FAIL, GET_SCHEDULE_SUCCESS, GET_SCHEDULE_FAIL, MATCH_RESOLVE_SUCCESS, MATCH_RESOLVE_FAIL, SCHEDULE_CREATED_FALSE_SUCCESS, SCHEDULE_CREATED_FAIL, SCHEDULE_UPDATING } from '../subActions/fantasyScheduleActions.js';

const initialState = {
  fantasySchedule: {},
  scheduleFetched: null,
  scheduleCreated: null,
  scheduleUpdate: false
};

export const fantasyScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        {
          fantasySchedule: action.fantasySchedule,
          scheduleCreated: action.scheduleCreated,
          scheduleFetched: action.scheduleFetched
        }
      );
    case CREATE_SCHEDULE_SUCCESS:
      return Object.assign({}, state,
        {
          fantasySchedule: action.fantasySchedule,
          scheduleCreated: action.scheduleCreated
        }
      );
    case MATCH_RESOLVE_SUCCESS:
      return Object.assign({}, state,
        {
          fantasySchedule: {
            weeklyMatches: action.weeklyMatches
          }
        }
      );
    case SCHEDULE_CREATED_FALSE_SUCCESS:
      return Object.assign({}, state, 
        {
          scheduleCreated: action.scheduleCreated,
          scheduleFetched: action.scheduleFetched
        }
      );
    case SCHEDULE_UPDATING:
      return Object.assign({}, state,
        {
          scheduleUpdate: action.scheduleUpdate
        }
      );
    case SCHEDULE_CREATED_FAIL:
    case MATCH_RESOLVE_FAIL:
    case GET_SCHEDULE_FAIL:
    case CREATE_SCHEDULE_FAIL:
    default:
      return state;
  }
};