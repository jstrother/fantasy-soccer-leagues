require('isomorphic-fetch');

export const SET_AS_BENCHER = 'SET_AS_BENCHER';
export const selectBencher = (fantasyClub, player, statusCode) => {
  return {
    type: SET_AS_BENCHER,
    fantasyClub,
    player,
    statusCode
  };
};

export const BENCHER_FAIL = 'BENCHER_FAIL';
export const bencherFail = (fantasyClub, player, statusCode) => {
  return {
    type: BENCHER_FAIL,
    fantasyClub,
    player,
    statusCode
  };
};

export const fetchBencher = (fantasyClub, thisBencher)  => dispatch => {
  return fetch('/something', {
    request: {
      fantasyClub,
      thisBencher
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(bencherFail(fantasyClub, null, res.status));
        return;
      } else {
        dispatch(bencherFail(fantasyClub, null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then((fantasyClub, thisBencher) => {
    dispatch(selectBencher(fantasyClub, thisBencher, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};