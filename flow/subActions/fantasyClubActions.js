/* eslint-disable no-console */

import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/fantasyClub`;

export const SET_CLUB_NAME_SUCCESS = 'SET_CLUB_NAME_SUCCESS';
export const setClubNameSuccess = (clubName, statusCode) => ({
  type: SET_CLUB_NAME_SUCCESS,
  clubName,
  statusCode
});

export const SET_CLUB_NAME_FAIL = 'SET_CLUB_NAME_FAIL';
export const setClubNameFail = statusCode => ({
  type: SET_CLUB_NAME_FAIL,
  statusCode
});

export const SET_ROSTER_SUCCESS = 'SET_ROSTER_SUCCESS';
export const setRosterSuccess = (roster, statusCode) => ({
  type: SET_ROSTER_SUCCESS,
  roster,
  statusCode
});

export const SET_ROSTER_FAIL = 'SET_ROSTER_FAIL';
export const setRosterFail = statusCode => ({
  type: SET_ROSTER_FAIL,
  statusCode
});

export const SET_MANAGER_SUCCESS = 'SET_MANAGER_SUCCESS';
export const setManagerSuccess = (manager, statusCode) => ({
  type: SET_MANAGER_SUCCESS,
  manager,
  statusCode
});

export const SET_MANAGER_FAIL = 'SET_MANAGER_FAIL';
export const setManagerFail = statusCode => ({
  type: SET_MANAGER_FAIL,
  statusCode
});

export const addRoster = (accessToken, roster) => dispatch => {
  return fetch(`${thisURL}/addRoster`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      roster
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setRosterFail(res.status));
        return;
      } else {
        dispatch(setRosterFail(500));
        throw new Error(res.statusText);
      }
    }
    return res.json();
  })
  .then(data => {
    dispatch(setRosterSuccess(data.roster, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addManager = (accessToken, manager) => dispatch => {
  return fetch(`${thisURL}/addManager`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      manager
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setManagerFail(res.status));
        return;
      } else {
        dispatch(setManagerFail(500));
        throw new Error(res.statusText);
      }
    }
    return res.json();
  })
  .then(data => {
    dispatch(setManagerSuccess(data.manager, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addClubName = (accessToken, clubName) => dispatch => {
  return fetch(`${thisURL}/addClubName`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      clubName
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setClubNameFail(res.status));
        return;
      } else {
        dispatch(setClubNameFail(500));
        throw new Error(res.statusText);
      }
    }
    return res.json();
  })
  .then(data => {
    // console.log('clubName data:', data);
    dispatch(setClubNameSuccess(data.clubName, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};