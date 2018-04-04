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

export const NEW_CLUB_SUCCESS = 'NEW_CLUB_SUCCESS';
export const newClubSuccess = (manager, userId, statusCode) => ({
  type: NEW_CLUB_SUCCESS,
  manager,
  userId,
  statusCode
});

export const NEW_CLUB_FAIL = 'NEW_CLUB_FAIL';
export const newClubFail = statusCode => ({
  type: NEW_CLUB_FAIL,
  statusCode
});

export const getClub = (accessToken) => dispatch => {
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
    // console.log('res.json():', res.json());
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

export const newClub = (accessToken, userId) => dispatch => {
  console.log('userId:', userId);
  return fetch(`${thisURL}/newClub`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      userId
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
    console.log('res.json():', res.json());
    // return res.json();
  })
  // .then(data => {
  //   dispatch(newClubSuccess(data.manager, 200));
  // })
  .catch(error => {
    throw new Error(error);
  });
};