require('isomorphic-fetch');

export const SET_AS_RESERVE = 'SET_AS_RESERVE';
export const setAsReserve = (player, statusCode) => {
  return {
    type: SET_AS_RESERVE,
    player,
    statusCode
  };
};

export const RESERVE_FAIL = 'RESERVE_FAIL';
export const reserveFail = (player, statusCode) => {
  return {
    type: RESERVE_FAIL,
    player,
    statusCode
  };
};

export const fetchReserve = (thisReserve)  => dispatch => {
  return fetch('/reserve', {
    request: {
      thisReserve
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(reserveFail(null, res.status));
        return;
      } else {
        dispatch(reserveFail(null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then((thisReserve) => {
    dispatch(setAsReserve(thisReserve, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};