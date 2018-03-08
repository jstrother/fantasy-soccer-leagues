/* eslint-disable no-console */

import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/fantasySchedule`;

export const POPULATE_SCHEDULE_SUCCESS = 'POPULATE_SCHEDULE_SUCCESS';
export const populateScheduleSuccess = (matches, clubs, statusCode) => ({
  type: POPULATE_SCHEDULE_SUCCESS,
  matches,
  clubs,
  statusCode
});

export const POPULATE_SCHEDULE_FAIL = 'POPULATE_SCHEDULE_FAIL';
export const populateScheduleFail = statusCode => ({
  type: POPULATE_SCHEDULE_FAIL,
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

export const POPULATE_MATCHES_SUCCESS = 'POPULATE_MATCHES_SUCCESS';
export const populateMatchesSuccess = (homeClub, awayClub, statusCode) => ({
  type: POPULATE_MATCHES_SUCCESS,
  homeClub,
  awayClub,
  statusCode
});

export const POPULATE_MATCHES_FAIL = 'POPULATE_MATCHES_FAIL';
export const populateMatchesFail = statusCode => ({
  type: POPULATE_MATCHES_FAIL,
  statusCode
});

export const populateFantasySchedule = () => dispatch => {
  return fetch(`${thisURL}/populateSchedule`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(populateScheduleFail(res.status));
        return;
      }
      dispatch(populateScheduleFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(populateScheduleSuccess(data, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const createSchedule = () => dispatch => {
  return fetch(`${thisURL}/createSchedule`, {
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

export const populateMatches = () => dispatch => {
  return fetch(`${thisURL}/populateMatches`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 400){
        dispatch(populateMatchesFail(res.status));
        return;
      }
      dispatch(populateMatchesFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(populateMatchesSuccess(data, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};