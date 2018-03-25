/* eslint-disable no-console */

import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/fantasyMatch`;

export const MATCH_RESOLUTION_SUCCESS = 'MATCH_RESOLUTION_SUCCESS';
export const matchResolutionSuccess = (weeklyMatches, statusCode) => ({
  type: MATCH_RESOLUTION_SUCCESS,
  weeklyMatches,
  statusCode
});

export const MATCH_RESOLUTION_FAIL = 'MATCH_RESOLUTION_FAIL';
export const matchResolutionFail = statusCode => ({
  type: MATCH_RESOLUTION_FAIL,
  statusCode
});

export const matchResolution = () => dispatch => {
  return fetch(`${thisURL}/matchResolution`, {
    method: 'POST'
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(matchResolutionFail(res.status));
        return;
      }
      dispatch(matchResolutionFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(weeklyMatches => {
    console.log('fantasyMatchActions:', weeklyMatches);
    dispatch(matchResolutionSuccess(weeklyMatches, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};