import fetch from 'isomorphic-fetch';
import {DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/fantasyMatch`;

export const MATCH_RESOLVE_SUCCESS = 'MATCH_RESOLVE_SUCCESS';
export const matchResolveSuccess = (resolvedMatches, statusCode) => ({
  type: MATCH_RESOLVE_SUCCESS,
  resolvedMatches,
  statusCode
});

export const MATCH_RESOLVE_FAIL = 'MATCH_RESOLVE_FAIL';
export const matchResolveFail = statusCode => ({
  type: MATCH_RESOLVE_FAIL,
  statusCode
});

export const matchResolve = () => dispatch => {
  return fetch(`${thisURL}`, {
    method: 'POST'
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(matchResolveFail(res.status));
        return;
      }
      dispatch(matchResolveFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(resolvedMatches => {
    dispatch(matchResolveSuccess(resolvedMatches, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};