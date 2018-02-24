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

export const SET_GOALKEEPER_SUCCESS = 'SET_GOALKEEPER_SUCCESS';
export const setGoalkeeperSuccess = (goalkeeper, statusCode) => ({
  type: SET_GOALKEEPER_SUCCESS,
  goalkeeper,
  statusCode
});

export const SET_GOALKEEPER_FAIL = 'SET_GOALKEEPER_FAIL';
export const setGoalkeeperFail = statusCode => ({
  type: SET_GOALKEEPER_FAIL,
  statusCode
});

export const REMOVE_GOALKEEPER_SUCCESS = 'REMOVE_GOALKEEPER_SUCCESS';
export const removeGoalkeeperSuccess = (goalkeeper, statusCode) => ({
  type: REMOVE_GOALKEEPER_SUCCESS,
  goalkeeper,
  statusCode
});

export const REMOVE_GOALKEEPER_FAIL = 'REMOVE_GOALKEEPER_FAIL';
export const removeGoalkeeperFail = statusCode => ({
  type: REMOVE_GOALKEEPER_FAIL,
  statusCode
});

export const SET_DEFENDER_SUCCESS = 'SET_DEFENDER_SUCCESS';
export const setDefenderSuccess = (defender, statusCode) => ({
  type: SET_DEFENDER_SUCCESS,
  defender,
  statusCode
});

export const SET_DEFENDER_FAIL = 'SET_DEFENDER_FAIL';
export const setDefenderFail = statusCode => ({
  type: SET_DEFENDER_FAIL,
  statusCode
});

export const SET_MIDFIELDER_SUCCESS = 'SET_MIDFIELDER_SUCCESS';
export const setMidfielderSuccess = (midfielder, statusCode) => ({
  type: SET_MIDFIELDER_SUCCESS,
  midfielder,
  statusCode
});

export const SET_MIDFIELDER_FAIL = 'SET_MIDFIELDER_FAIL';
export const setMidfielderFail = statusCode => ({
  type: SET_MIDFIELDER_FAIL,
  statusCode
});

export const SET_FORWARD_SUCCESS = 'SET_FORWARD_SUCCESS';
export const setForwardSuccess = (forward, statusCode) => ({
  type: SET_FORWARD_SUCCESS,
  forward,
  statusCode
});

export const SET_FORWARD_FAIL = 'SET_FORWARD_FAIL';
export const setForwardFail = statusCode => ({
  type: SET_FORWARD_FAIL,
  statusCode
});

export const SET_MANAGER_SUCCESS = 'SET_MANAGER_SUCCESS';
export const setManagerSuccess = (manager, statusCode) => ({
  type: SET_MANAGER_SUCCESS,
  manager,
  statusCode
});

export const SET_MANAGER_FAIL = 'SET_MANAGER_FAIL';
export const setManagerFail = statusCode => ({
  type: SET_MANAGER_FAIL,
  statusCode
});

export const getClub = accessToken => dispatch => {
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
    return res.json();
  })
  .then(data => {
    dispatch(getClubSuccess(data));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addGoalkeeper = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/addGoalkeeper`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      player
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setGoalkeeperFail(res.status));
        return;
      } 
      dispatch(setGoalkeeperFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(setGoalkeeperSuccess(data, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const removeGoalkeeper = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/removeGoalkeeper`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      player
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(removeGoalkeeperFail(res.status));
        return;
      }
      dispatch(removeGoalkeeperFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(removeGoalkeeperSuccess(data, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addDefender = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/addDefender`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      player
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setDefenderFail(res.status));
        return;
      }
      dispatch(setDefenderFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(setDefenderSuccess(data, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addMidfielder = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/addMidfielder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      player
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setMidfielderFail(res.status));
        return;
      } 
      dispatch(setMidfielderFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(setMidfielderSuccess(data, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addForward = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/addForward`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      player
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setForwardFail(res.status));
        return;
      } 
      dispatch(setForwardFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(setForwardSuccess(data, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addManager = (accessToken, manager) => dispatch => {
  return fetch(`${thisURL}/addManager`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      manager
    })
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setManagerFail(res.status));
        return;
      } 
      dispatch(setManagerFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(setManagerSuccess(data.manager, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

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
    dispatch(setClubNameSuccess(data.clubName, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};