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

export const getSchedule = accessToken => dispatch => {
  return fetch(`${thisURL}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
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

export const createSchedule = accessToken => dispatch => {
  return fetch(`${thisURL}/scheduleCreator`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
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