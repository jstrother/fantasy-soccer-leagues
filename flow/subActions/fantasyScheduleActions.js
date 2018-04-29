/* eslint-disable no-console */

import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/fantasySchedule`;

export const GET_SCHEDULE_SUCCESS = 'GET_SCHEDULE_SUCCESS';
export const getScheduleSuccess = (fantasySchedule, statusCode) => ({
  type: GET_SCHEDULE_SUCCESS,
  fantasySchedule,
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

export const getSchedule = () => dispatch => {
  return fetch(`${thisURL}`)
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
    console.log('fsActions fantasySchedule:', fantasySchedule);
    dispatch(getScheduleSuccess(fantasySchedule, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const createSchedule = () => dispatch => {
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
    console.log('fsActions weeklyMatches:', weeklyMatches);
    dispatch(matchResolveSuccess(weeklyMatches, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};