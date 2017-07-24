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

export const fetchReserve = (fantasyClub, thisReserve)  => dispatch => {
  return fetch('/something', {
    request: {
      fantasyClub,
      thisReserve
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
  .then((fantasyClub, thisReserve) => {
    dispatch(selectReserve(fantasyClub, thisReserve, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};