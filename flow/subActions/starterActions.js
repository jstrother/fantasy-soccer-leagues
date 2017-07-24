require('isomorphic-fetch');

export const SET_AS_STARTER = 'SET_AS_STARTER';
export const selectStarter = (fantasyClub, player, statusCode) => {
  return {
    type: SET_AS_STARTER,
    fantasyClub,
    player,
    statusCode
  };
};

export const STARTER_FAIL = 'STARTER_FAIL';
export const starterFail = (fantasyClub, player, statusCode) => {
  return {
    type: STARTER_FAIL,
    fantasyClub,
    player,
    statusCode
  };
};

export const fetchStarter = (fantasyClub, thisStarter)  => dispatch => {
  return fetch('/something', {
    request: {
      fantasyClub,
      thisStarter
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(starterFail(fantasyClub, null, res.status));
        return;
      } else {
        dispatch(starterFail(fantasyClub, null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then((fantasyClub, thisStarter) => {
    dispatch(selectStarter(fantasyClub, thisStarter, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};