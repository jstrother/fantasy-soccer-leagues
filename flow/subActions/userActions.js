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
    console.log('userActions currentUser', currentUser);
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};