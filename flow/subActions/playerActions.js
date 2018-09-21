/*eslint-disable no-console, no-unused-vars*/

import fetch from 'isomorphic-fetch';
import { DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/player`;

export const PLAYER_DATA_SUCCESS = 'PLAYER_DATA_SUCCESS';
export const playerDataSuccess = (player, statusCode) => ({
  type: PLAYER_DATA_SUCCESS,
  player,
  show: true,
  statusCode
});

export const PLAYER_DATA_FAIL = 'PLAYER_DATA_FAIL';
export const playerDataFail = statusCode => ({
  type: PLAYER_DATA_FAIL,
  statusCode
});

export const PLAYER_HIDE_SUCCESS = 'PLAYER_HIDE_SUCCESS';
export const playerHideSuccess = () => ({
  type: PLAYER_HIDE_SUCCESS,
  show: false
});

export const PLAYER_HIDE_FAIL = 'PLAYER_HIDE_FAIL';
export const playerHideFail = () => ({
  type: PLAYER_HIDE_FAIL
});

export const fetchPlayerData = (accessToken, playerId) => dispatch => {
  return fetch(`${thisURL}/${playerId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(playerDataFail(res.status));
        return;
      }
      dispatch(playerDataFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(player => {
    dispatch(playerDataSuccess(player, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};