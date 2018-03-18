/* eslint-disable no-console */

import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/fantasySchedule`;

export const GET_SCHEDULE_SUCCESS = 'GET_SCHEDULE_SUCCESS';
export const getScheduleSuccess = (matches, statusCode) => ({
  type: GET_SCHEDULE_SUCCESS,
  matches,
  statusCode
});

export const GET_SCHEDULE_FAIL = 'GET_SCHEDULE_FAIL';
export const getScheduleFail = statusCode => ({
  type: GET_SCHEDULE_FAIL,
  statusCode
});

export const CREATE_SCHEDULE_SUCCESS = 'CREATE_SCHEDULE_SUCCESS';
export const createScheduleSuccess = (matches, statusCode) => ({
  type: CREATE_SCHEDULE_SUCCESS,
  matches,
  statusCode
});

export const CREATE_SCHEDULE_FAIL = 'CREATE_SCHEDULE_FAIL';
export const createScheduleFail = statusCode => ({
  type: CREATE_SCHEDULE_FAIL,
  statusCode
});

export const CHECK_SCHEDULE_SUCCESS = 'CHECK_SCHEDULE_SUCCESS';
export const checkScheduleSuccess = (matches, statusCode) => ({
  type: CHECK_SCHEDULE_SUCCESS,
  matches,
  statusCode
});

export const CHECK_SCHEDULE_FAIL = 'CHECK_SCHEDULE_FAIL';
export const checkScheduleFail = (statusCode) => ({
  type: CHECK_SCHEDULE_FAIL,
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
  .then(data => {
    dispatch(getScheduleSuccess(data, 200));
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
  .then(data => {
    dispatch(createScheduleSuccess(data, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const checkSchedule = () => dispatch => {
  return fetch(`${thisURL}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(checkScheduleSuccess(res.status));
        return;
      }
      dispatch(checkScheduleFail(500));
      throw new Error(res.statusText);
    }
    res.json();
  })
  .then(data => {
    dispatch(checkScheduleSuccess(data, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};