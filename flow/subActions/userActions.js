import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const setUserSuccess = (currentUser, statusCode)  => ({
  type: SET_USER_SUCCESS,
  currentUser,
  statusCode
});

export const SET_USER_FAIL = 'SET_USER_FAIL';
export const setUserFail = statusCode  => ({
  type: SET_USER_FAIL,
  statusCode
});

export const SET_LEAGUE_SUCCESS = 'SET_LEAGUE_SUCCESS';
export const setLeagueSuccess = (fantasyLeagueId, fantasyLeagueName, statusCode) => ({
  type: SET_LEAGUE_SUCCESS,
  fantasyLeagueId,
  fantasyLeagueName,
  statusCode
});

export const SET_LEAGUE_FAIL = 'SET_LEAGUE_FAIL';
export const setLeagueFail = statusCode => ({
  type: SET_LEAGUE_FAIL,
  statusCode
});

export const SET_ROSTER_SUCCESS = 'SET_ROSTER_SUCCESS';
export const setRosterSuccess = (roster, statusCode) => ({
  type: SET_ROSTER_SUCCESS,
  roster,
  statusCode
});

export const SET_ROSTER_FAIL = 'SET_ROSTER_FAIL';
export const setRosterFail = statusCode => ({
  type: SET_ROSTER_FAIL,
  statusCode
});

export const fetchUser = accessToken => dispatch => {
  return fetch(`${url}/user`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(setUserFail(res.status));
        return;
      } else {
        dispatch(setUserFail(500));
        throw new Error(res.statusText);
      }
    }
    return res.json();
  })
  .then(currentUser => {
    dispatch(setUserSuccess(currentUser, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addLeague = (accessToken, fantasyLeagueId, fantasyLeagueName) => dispatch => {
  return fetch(`${url}/user/addLeague`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      fantasyLeagueId,
      fantasyLeagueName
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setLeagueFail(res.status));
        return;
      } else {
        dispatch(setLeagueFail(500));
        throw new Error(res.statusText);
      }
    }
    return res.json();
  })
  .then(data => {
    dispatch(setLeagueSuccess(data.fantasyLeagueId, data.fantasyLeagueName, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addRoster = (accessToken, roster) => dispatch => {
  return fetch(`${url}/user/addRoster`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      roster
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setLeagueFail(res.status));
        return;
      } else {
        dispatch(setLeagueFail(500));
        throw new Error(res.statusText);
      }
    }
    return res.json();
  })
  .then(data => {
    dispatch(setRosterSuccess(data.roster, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};