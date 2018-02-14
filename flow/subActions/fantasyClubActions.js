/* eslint-disable no-console */

import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/fantasyClub`;

export const GET_CLUB_SUCCESS = 'GET_CLUB_SUCCESS';
export const getClubSuccess = (fantasyClub, statusCode) => ({
  type: GET_CLUB_SUCCESS,
  fantasyClub,
  statusCode
});

export const GET_CLUB_FAIL = 'GET_CLUB_FAIL';
export const getClubFail = statusCode => ({
  type: GET_CLUB_FAIL,
  statusCode
});

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

export const getClub = accessToken => dispatch => {
  return fetch(`${thisURL}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(getClubFail(res.status));
        return;
      }
      dispatch(getClubFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(getClubSuccess(data));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addRoster = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/addRoster`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      player
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setRosterFail(res.status));
        return;
      } 
      dispatch(setRosterFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(setRosterSuccess(data, 200));
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
      } 
      dispatch(setManagerFail(500));
      throw new Error(res.statusText);
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
      } 
      dispatch(setClubNameFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(setClubNameSuccess(data.clubName, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};