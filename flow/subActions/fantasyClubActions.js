/* eslint-disable no-console, no-unused-vars */

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
export const newClubSuccess = (clubName, manager, statusCode) => ({
  type: NEW_CLUB_SUCCESS,
  clubName,
  manager,
  statusCode
});

export const NEW_CLUB_FAIL = 'NEW_CLUB_FAIL';
export const newClubFail = statusCode => ({
  type: NEW_CLUB_FAIL,
  statusCode
});

export const GET_ROSTER_SUCCESS = 'GET_ROSTER_SUCCESS';
export const getRosterSuccess = (roster, statusCode) => ({
  type: GET_ROSTER_SUCCESS,
  roster,
  statusCode
});

export const GET_ROSTER_FAIL = 'GET_ROSTER_FAIL';
export const getRosterFail = statusCode => ({
  type: GET_ROSTER_FAIL,
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

export const REMOVE_DEFENDER_SUCCESS = 'REMOVE_DEFENDER_SUCCESS';
export const removeDefenderSuccess = (defender, statusCode) => ({
  type: REMOVE_DEFENDER_SUCCESS,
  defender,
  statusCode
});

export const REMOVE_DEFENDER_FAIL = 'REMOVE_DEFENDER_FAIL';
export const removeDefenderFail = statusCode => ({
  type: REMOVE_DEFENDER_FAIL,
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

export const REMOVE_MIDFIELDER_SUCCESS = 'REMOVE_MIDFIELDER_SUCCESS';
export const removeMidfielderSuccess = (midfielder, statusCode) => ({
  type: REMOVE_MIDFIELDER_SUCCESS,
  midfielder,
  statusCode
});

export const REMOVE_MIDFIELDER_FAIL = 'REMOVE_MIDFIELDER_FAIL';
export const removeMidfielderFail = statusCode => ({
  type: REMOVE_MIDFIELDER_FAIL,
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

export const REMOVE_FORWARD_SUCCESS = 'REMOVE_FORWARD_SUCCESS';
export const removeForwardSuccess = (forward, statusCode) => ({
  type: REMOVE_FORWARD_SUCCESS,
  forward,
  statusCode
});

export const REMOVE_FORWARD_FAIL = 'REMOVE_FORWARD_FAIL';
export const removeForwardFail = statusCode => ({
  type: REMOVE_FORWARD_FAIL,
  statusCode
});

export const ADD_STARTER_SUCCESS = 'ADD_STARTER_SUCCESS';
export const addStarterSuccess = (starter, statusCode) => ({
  type: ADD_STARTER_SUCCESS,
  starter,
  statusCode
});

export const ADD_STARTER_FAIL = 'ADD_STARTER_FAIL';
export const addStarterFail = statusCode => ({
  type: ADD_STARTER_FAIL,
  statusCode
});

export const REMOVE_STARTER_SUCCESS = 'REMOVE_STARTER_SUCCESS';
export const removeStarterSuccess = (starter, statusCode) => ({
  type: REMOVE_STARTER_SUCCESS,
  starter,
  statusCode
});

export const REMOVE_STARTER_FAIL = 'REMOVE_STARTER_FAIL';
export const removeStarterFail = statusCode => ({
  type: REMOVE_STARTER_FAIL,
  statusCode
});

export const ADD_BENCHWARMER_SUCCESS = 'ADD_BENCHWARMER_SUCCESS';
export const addBenchwarmerSuccess = (benchwarmer, statusCode) => ({
  type: ADD_BENCHWARMER_SUCCESS,
  benchwarmer,
  statusCode
});

export const ADD_BENCHWARMER_FAIL = 'ADD_BENCHWARMER_FAIL';
export const addBenchwarmerFail = statusCode => ({
  type: ADD_BENCHWARMER_FAIL,
  statusCode
});

export const REMOVE_BENCHWARMER_SUCCESS = 'REMOVE_BENCHWARMER_SUCCESS';
export const removeBenchwarmerSuccess = (benchwarmer, statusCode) => ({
  type: REMOVE_BENCHWARMER_SUCCESS,
  benchwarmer,
  statusCode
});

export const REMOVE_BENCHWARMER_FAIL = 'REMOVE_BENCHWARMER_FAIL';
export const removeBenchwarmerFail = statusCode => ({
  type: REMOVE_BENCHWARMER_FAIL,
  statusCode
});

export const getClub = (accessToken, manager) => dispatch => {
  return fetch(`${thisURL}/${manager}`, {
    headers: {
      'Content-Type': 'application/json',
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
  .then(fantasyClub => {
    dispatch(getClubSuccess(fantasyClub, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const newClub = (accessToken, clubName, manager) => dispatch => {
  return fetch(`${thisURL}/newClub`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      clubName,
      manager
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
    return res.json();
  })
  .then(data => {
    dispatch(newClubSuccess(data.clubName, data.manager, 200));
  })
  .catch(error => {
    console.error(error.message);
    // throw new Error(error);
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
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const removeGoalkeeper = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/removeGoalkeeper`, {
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
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const removeDefender = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/removeDefender`, {
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
        dispatch(removeDefenderFail(res.status));
        return;
      }
      dispatch(removeDefenderFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(removeDefenderSuccess(data, 200));
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
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const removeMidfielder = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/removeMidfielder`, {
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
        dispatch(removeMidfielderFail(res.status));
        return;
      } 
      dispatch(removeMidfielderFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(removeMidfielderSuccess(data, 200));
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
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const removeForward = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/removeForward`, {
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
        dispatch(removeForwardFail(res.status));
        return;
      } 
      dispatch(removeForwardFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(removeForwardSuccess(data, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addStarter = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/addStarter`, {
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
        dispatch(addStarterFail(res.status));
        return;
      } 
      dispatch(addStarterFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(addStarterSuccess(data, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const removeStarter = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/removeStarter`, {
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
        dispatch(removeStarterFail(res.status));
        return;
      }
      dispatch(removeStarterFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(removeStarterSuccess(data, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const addBench = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/addBench`, {
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
        dispatch(addBenchwarmerFail(res.status));
        return;
      } 
      dispatch(addBenchwarmerFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(addBenchwarmerSuccess(data, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const removeBench = (accessToken, player) => dispatch => {
  return fetch(`${thisURL}/removeBench`, {
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
        dispatch(removeBenchwarmerFail(res.status));
        return;
      }
      dispatch(removeBenchwarmerFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(removeBenchwarmerSuccess(data, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};