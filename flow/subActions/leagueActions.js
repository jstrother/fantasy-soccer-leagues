/* eslint-disable no-console*/
import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

export const LEAGUE_SUCCESS = 'LEAGUE_SUCCESS';
export const leagueSuccess = (players, statusCode) => ({
  type: LEAGUE_SUCCESS,
  players,
  statusCode
});

export const LEAGUE_FAIL = 'LEAGUE_FAIL';
export const leagueFail = statusCode => ({
  type: LEAGUE_FAIL,
  statusCode
});

export const fetchLeague = leagueId => dispatch => {
  return fetch(`${url}/league/${leagueId}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(leagueFail(res.status));
        return;
      } else {
        dispatch(leagueFail(500));
        throw new Error(res.statusText);
      }
    }
    return res.json();
  })
  .then(players => {
    dispatch(leagueSuccess(players, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};