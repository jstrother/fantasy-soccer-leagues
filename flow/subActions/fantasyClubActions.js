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

export const SET_MANAGER_SUCCESS = 'SET_MANAGER_SUCCESS';
export const setManagerSuccess = (manager, userId, statusCode) => ({
  type: SET_MANAGER_SUCCESS,
  manager,
  userId,
  statusCode
});

export const SET_MANAGER_FAIL = 'SET_MANAGER_FAIL';
export const setManagerFail = statusCode => ({
  type: SET_MANAGER_FAIL,
  statusCode
});

export const getClub = (accessToken, userId) => dispatch => {
  return fetch(`${thisURL}/:${userId}`, {
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
    // console.log('getClub res.json:', res.json()); // comes back as null
    return res.json();
  })
  .then(fantasyClub => {
    console.log('getClub fantasyClub:', fantasyClub);
    dispatch(getClubSuccess(fantasyClub, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addManager = (accessToken, manager, userId) => dispatch => {
  return fetch(`${thisURL}/addManager`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      manager,
      userId
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
    dispatch(setManagerSuccess(data.manager, data.userId, 200));
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
    console.log('addClubName data:', data);
    dispatch(setClubNameSuccess(data.clubName, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};