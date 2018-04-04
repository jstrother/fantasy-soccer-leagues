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