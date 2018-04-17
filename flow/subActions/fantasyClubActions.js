/* eslint-disable no-console, no-unused-vars */

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

export const NEW_CLUB_SUCCESS = 'NEW_CLUB_SUCCESS';
export const newClubSuccess = (clubName, manager, statusCode) => ({
  type: NEW_CLUB_SUCCESS,
  clubName,
  manager,
  statusCode
});

export const NEW_CLUB_FAIL = 'NEW_CLUB_FAIL';
export const newClubFail = statusCode => ({
  type: NEW_CLUB_FAIL,
  statusCode
});

export const getClub = (accessToken, manager) => dispatch => {
  return fetch(`${thisURL}/${manager}`, {
    headers: {
      'Content-Type': 'application/json',
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
  .then(fantasyClub => {
    dispatch(getClubSuccess(fantasyClub, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const newClub = (accessToken, clubName, manager) => dispatch => {
  return fetch(`${thisURL}/newClub`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      clubName,
      manager
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(newClubFail(res.status));
        return;
      } 
      dispatch(newClubFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(newClubSuccess(data.clubName, data.manager, 200));
  })
  .catch(error => {
    console.error(error.message);
    // throw new Error(error);
  });
};