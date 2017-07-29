require('isomorphic-fetch');

export const SET_AS_STARTER = 'SET_AS_STARTER';
export const setAsStarter = (player, statusCode) => {
  return {
    type: SET_AS_STARTER,
    player,
    statusCode
  };
};

export const STARTER_FAIL = 'STARTER_FAIL';
export const starterFail = (player, statusCode) => {
  return {
    type: STARTER_FAIL,
    player,
    statusCode
  };
};

export const fetchStarter = (thisStarter)  => dispatch => {
  return fetch('/starter', {
    request: {
      thisStarter
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(starterFail(null, res.status));
        return;
      } else {
        dispatch(starterFail(null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then((thisStarter) => {
    dispatch(setAsStarter(thisStarter, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};