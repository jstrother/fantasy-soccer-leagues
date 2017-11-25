const fetch = require('isomorphic-fetch');

export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const setUserSuccess = (currentUser, statusCode)  => ({
  type: SET_USER_SUCCESS,
  currentUser,
  statusCode
});

export const SET_USER_FAIL = 'SET_USER_FAIL';
export const setUserFail = (currentUser, statusCode)  => ({
  type: SET_USER_FAIL,
  currentUser,
  statusCode
});

export const SET_LEAGUE = 'SET_LEAGUE';
export const setLeague = (fantasyLeagueId, fantasyLeagueName, statusCode) => ({
  type: SET_LEAGUE,
  fantasyLeagueId,
  fantasyLeagueName,
  statusCode
});

export const SET_LEAGUE_FAIL = 'SET_LEAGUE_FAIL';
export const setLeagueFail = (fantasyLeagueId, fantasyLeagueName, statusCode) => ({
  type: SET_LEAGUE_FAIL,
  fantasyLeagueId,
  fantasyLeagueName,
  statusCode
});

export const addLeague = (accessToken, fantasyLeagueId, fantasyLeagueName) => dispatch => {
  return fetch(`https://fantasy-soccer-leagues-jstrother.c9users.io/user/addLeague`, {
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
        dispatch(setLeagueFail(null, null, res.status));
        return;
      } else {
        dispatch(setLeagueFail(null, null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    dispatch(setLeague(data.fantasyLeagueId, data.fantasyLeagueName, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const fetchUser = (accessToken) => dispatch => {
  return fetch('https://fantasy-soccer-leagues-jstrother.c9users.io/user', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(setUserFail(null, res.status));
        return;
      } else {
        dispatch(setUserFail(null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(currentUser => {
    console.log('currentUser:', currentUser);
    dispatch(setUserSuccess(currentUser, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const userLeague = (accessToken) => dispatch => {
  return fetch(`https://fantasy-soccer-leagues-jstrother.c9users.io/user/league`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setLeagueFail(null, null, res.status));
        return;
      } else {
        dispatch(setLeagueFail(null, null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    console.log('data:', data);
    dispatch(setLeague(data.fantasyLeagueId, data.fantasyLeagueName, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};