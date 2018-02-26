/*eslint-disable no-console, no-unused-vars*/

import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/player`;

export const PLAYER_DATA_SUCCESS = 'PLAYER_DATA_SUCCESS';
export const playerDataSuccess = (player, statusCode) => ({
  type: PLAYER_DATA_SUCCESS,
  player,
  statusCode
});

export const PLAYER_DATA_FAIL = 'PLAYER_DATA_FAIL';
export const playerDataFail = statusCode => ({
  type: PLAYER_DATA_FAIL,
  statusCode
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