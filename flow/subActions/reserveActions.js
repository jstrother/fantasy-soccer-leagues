require('isomorphic-fetch');

export const SET_AS_RESERVE = 'SET_AS_RESERVE';
export const selectReserve = (fantasyClub, player, statusCode) => {
  return {
    type: SET_AS_RESERVE,
    fantasyClub,
    player,
    statusCode
  };
};

export const RESERVE_FAIL = 'RESERVE_FAIL';
export const reserveFail = (fantasyClub, player, statusCode) => {
  return {
    type: RESERVE_FAIL,
    fantasyClub,
    player,
    statusCode
  };
};

export const fetchPlayer = (fantasyClub, thisPlayer)  => dispatch => {
  return fetch('/something', {
    request: {
      fantasyClub,
      thisPlayer
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(reserveFail(fantasyClub, null, res.status));
        return;
      } else {
        dispatch(reserveFail(fantasyClub, null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then((fantasyClub, thisPlayer) => {
    dispatch(selectReserve(fantasyClub, thisPlayer, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};