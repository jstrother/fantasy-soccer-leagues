import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/player`;

export const ROSTER_PLAYER_DATA_SUCCESS = 'ROSTER_PLAYER_DATA_SUCCESS';
export const rosterPlayerDataSuccess = (player, statusCode) => ({
  type: ROSTER_PLAYER_DATA_SUCCESS,
  player,
  statusCode
});

export const ROSTER_PLAYER_DATA_FAIL = 'ROSTER_PLAYER_DATA_FAIL';
export const rosterPlayerDataFail = statusCode => ({
  type: ROSTER_PLAYER_DATA_FAIL,
  statusCode
});
  
export const SET_STARTER_SUCCESS = 'SET_STARTER_SUCCESS';
export const setStarterSuccess = (player, statusCode) => ({
  type: SET_STARTER_SUCCESS,
  player,
  statusCode
});

export const SET_STARTER_FAIL = 'SET_STARTER_FAIL';
export const setStarterFail = statusCode => ({
  type: SET_STARTER_FAIL,
  statusCode
});

export const SET_BENCHWARMER_SUCCESS = 'SET_BENCHWARMER_SUCCESS';
export const setBenchwarmerSuccess = (player, statusCode) => ({
  type: SET_BENCHWARMER_SUCCESS,
  player,
  statusCode
});

export const SET_BENCHWARMER_FAIL = 'SET_BENCHWARMER_FAIL';
export const setBenchwarmerFail = statusCode => ({
  type: SET_BENCHWARMER_FAIL,
  statusCode
});

export const SET_RESERVE_SUCCESS = 'SET_RESERVE_SUCCESS';
export const setReserveSuccess = (player, statusCode) => ({
  type: SET_RESERVE_SUCCESS,
  player,
  statusCode
});

export const SET_RESERVE_FAIL = 'SET_RESERVE_FAIL';
export const setReserveFail = statusCode => ({
  type: SET_RESERVE_FAIL,
  statusCode
});

export const fetchRosterPlayerData = playerId => dispatch => {
  return fetch(`${thisURL}/${playerId}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(rosterPlayerDataFail(res.status));
        return;
      }
      dispatch(rosterPlayerDataFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(player => {
    dispatch(rosterPlayerDataSuccess(player, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const fetchStarter = player => dispatch => {
  return fetch(`${thisURL}/${player.idFromAPI}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(setStarterFail(res.status));
        return;
      } 
      dispatch(setStarterFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(player => {
    dispatch(setStarterSuccess(player, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const fetchBenchwarmer = player => dispatch => {
  return fetch(`${thisURL}/${player.idFromAPI}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(setBenchwarmerFail(res.status));
        return;
      } 
      dispatch(setBenchwarmerFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(player => {
    dispatch(setBenchwarmerSuccess(player, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const fetchReserve = player => dispatch => {
  return fetch(`${thisURL}/${player.idFromAPI}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(setReserveFail(res.status));
        return;
      } 
      dispatch(setReserveFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(player => {
    dispatch(setReserveSuccess(player, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};