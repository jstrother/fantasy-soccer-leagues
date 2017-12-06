const fetch = require('isomorphic-fetch'),
  url = require('../../server/config.js').THIS_DIRECTORY;
  
export const SET_STARTER_SUCCESS = 'SET_STARTER_SUCCESS';
export const setStarterSuccess = (starter, statusCode) => {
  type: SET_STARTER_SUCCESS,
  starter,
  statusCode
};

export const SET_STARTER_FAIL = 'SET_STARTER_FAIL';
export const setStarterFail = statusCode => {
  type: SET_STARTER_FAIL,
  statusCode
};

export const SET_BENCHWARMER_SUCCESS = 'SET_BENCHWARMER_SUCCESS';
export const setBenchwarmerSuccess = (benchwarmer, statusCode) => {
  type: SET_BENCHWARMER_SUCCESS,
  benchwarmer,
  statusCode
};

export const SET_BENCHWARMER_FAIL = 'SET_BENCHWARMER_FAIL';
export const setBenchwarmerFail = statusCode => {
  type: SET_BENCHWARMER_FAIL,
  statusCode
};

export const SET_RESERVE_SUCCESS = 'SET_RESERVE_SUCCESS';
export const setReserveSuccess = (reserve, statusCode) => {
  type: SET_RESERVE_SUCCESS,
  reserve,
  statusCode
};

export const SET_RESERVE_FAIL = 'SET_RESERVE_FAIL';
export const setReserveFail = statusCode => {
  type: SET_RESERVE_FAIL,
  statusCode
};

export const fetchStarter = starter => dispatch => {
  return fetch(`${url}/player/${starter}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(setStarterFail(res.status));
        return;
      } else {
        dispatch(setStarterFail(500));
        throw new Error(res.statusText);
      }
    }
    return res.json();
  })
  .then(starter => {
    dispatch(setStarterSuccess(starter, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const fetchBenchwarmer = benchwarmer => dispatch => {
  return fetch(`${url}/player/${benchwarmer}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(setBenchwarmerFail(res.status));
        return;
      } else {
        dispatch(setBenchwarmerFail(500));
        throw new Error(res.statusText);
      }
    }
    return res.json();
  })
  .then(benchwarmer => {
    dispatch(setBenchwarmerSuccess(benchwarmer, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const fetchReserve = reserve => dispatch => {
  return fetch(`${url}/player/${reserve}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(setReserveFail(res.status));
        return;
      } else {
        dispatch(setReserveFail(500));
        throw new Error(res.statusText);
      }
    }
    return res.json();
  })
  .then(reserve => {
    dispatch(setReserveSuccess(reserve, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};