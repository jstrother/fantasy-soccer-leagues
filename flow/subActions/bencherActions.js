require('isomorphic-fetch');

export const SET_AS_BENCHER = 'SET_AS_BENCHER';
export const setAsBencher = (player, statusCode) => {
  return {
    type: SET_AS_BENCHER,
    player,
    statusCode
  };
};

export const BENCHER_FAIL = 'BENCHER_FAIL';
export const bencherFail = (player, statusCode) => {
  return {
    type: BENCHER_FAIL,
    player,
    statusCode
  };
};

export const fetchBencher = (thisBencher)  => dispatch => {
  return fetch('/bencher', {
    request: {
      thisBencher
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(bencherFail(null, res.status));
        return;
      } else {
        dispatch(bencherFail(null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then((thisBencher) => {
    dispatch(setAsBencher(thisBencher, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};