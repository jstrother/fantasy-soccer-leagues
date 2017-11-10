require('isomorphic-fetch');

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

export const SELECT_LEAGUE = 'SELECT_LEAGUE';
export const selectLeague = (fantasyLeagueId, fantasyLeagueName, statusCode) => ({
  type: SELECT_LEAGUE,
  fantasyLeagueId,
  fantasyLeagueName,
  statusCode
});

export const SELECT_LEAGUE_FAIL = 'SELECT_LEAGUE_FAIL';
export const selectLeagueFail = (fantasyLeagueId, fantasyLeagueName, statusCode) => ({
  type: SELECT_LEAGUE_FAIL,
  fantasyLeagueId,
  fantasyLeagueName,
  statusCode
});

export const addLeague = (accessToken, fantasyLeagueId, fantasyLeagueName) => dispatch => {
  return fetch('https://fantasy-soccer-leagues-jstrother.c9users.io/user/addLeague', {
    method: 'PUT',
    headers: {
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
        dispatch(selectLeagueFail(null, null, res.status));
        return;
      } else {
        dispatch(selectLeagueFail(null, null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then((fantasyLeagueId, fantasyLeagueName) => {
    dispatch(selectLeague(fantasyLeagueId, fantasyLeagueName, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const fetchUser = accessToken => dispatch => {
  return fetch('/user', {
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
    dispatch(setUserSuccess(currentUser, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};