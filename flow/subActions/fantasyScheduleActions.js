/* eslint-disable no-console */

import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/fantasySchedule`;

export const GET_SCHEDULE_SUCCESS = 'GET_SCHEDULE_SUCCESS';
export const getScheduleSuccess = (fantasySchedule, statusCode) => ({
  type: GET_SCHEDULE_SUCCESS,
  fantasySchedule,
  scheduleCreated: true,
  scheduleFetched: true,
  statusCode
});

export const GET_SCHEDULE_FAIL = 'GET_SCHEDULE_FAIL';
export const getScheduleFail = statusCode => ({
  type: GET_SCHEDULE_FAIL,
  statusCode
});

export const CREATE_SCHEDULE_SUCCESS = 'CREATE_SCHEDULE_SUCCESS';
export const createScheduleSuccess = (fantasySchedule, statusCode) => ({
  type: CREATE_SCHEDULE_SUCCESS,
  fantasySchedule,
  scheduleCreated: true,
  statusCode
});

export const CREATE_SCHEDULE_FAIL = 'CREATE_SCHEDULE_FAIL';
export const createScheduleFail = statusCode => ({
  type: CREATE_SCHEDULE_FAIL,
  statusCode
});

export const MATCH_RESOLVE_SUCCESS = 'MATCH_RESOLVE_SUCCESS';
export const matchResolveSuccess = (weeklyMatches, statusCode) => ({
  type: MATCH_RESOLVE_SUCCESS,
  weeklyMatches,
  statusCode
});

export const MATCH_RESOLVE_FAIL = 'MATCH_RESOLVE_FAIL';
export const matchResolveFail = statusCode => ({
  type: MATCH_RESOLVE_FAIL,
  statusCode
});

export const SCHEDULE_CREATED_FALSE_SUCCESS = 'SCHEDULE_CREATED_FALSE_SUCCESS';
export const scheduleCreatedFalseSuccess = statusCode => ({
  type: SCHEDULE_CREATED_FALSE_SUCCESS,
  scheduleCreated: false,
  scheduleFetched: false,
  statusCode
});

export const SCHEDULE_CREATED_FAIL = 'SCHEDULE_CREATED_FAIL';
export const scheduleCreatedFail = statusCode => ({
  type: SCHEDULE_CREATED_FAIL,
  statusCode
});

export const SCHEDULE_UPDATING = 'SCHEDULE_UPDATING';
export const scheduleUpdating = statusCode => ({
  type: SCHEDULE_UPDATING,
  scheduleUpdate: true,
  statusCode
});

export const wasScheduleCreated = () => dispatch => {
  return fetch(`${thisURL}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(scheduleCreatedFail(res.status));
        return;
      }
      dispatch(scheduleCreatedFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    if (data.length === 0) {
      dispatch(scheduleCreatedFalseSuccess(200));
    }
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const getSchedule = leagueScheduleId => dispatch => {
  return fetch(`${thisURL}/${leagueScheduleId}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(getScheduleFail(res.status));
        return;
      }
      dispatch(getScheduleFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(fantasySchedule => {
    dispatch(getScheduleSuccess(fantasySchedule, 200));
  })
  .catch(error => {
    // throw new Error(error);
    console.error(error);
  });
};

export const createSchedule = () => dispatch => {
  dispatch(scheduleUpdating(200));
  return fetch(`${thisURL}/scheduleCreator`, {
    method: 'POST'
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(createScheduleFail(res.status));
        return;
      }
      dispatch(createScheduleFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(fantasySchedule => {
    dispatch(createScheduleSuccess(fantasySchedule, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const matchResolve = () => dispatch => {
  return fetch(`${thisURL}/matchResolver`, {
    method: 'POST'
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(matchResolveFail(res.status));
        return;
      }
      dispatch(matchResolveFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(weeklyMatches => {
    dispatch(matchResolveSuccess(weeklyMatches, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};