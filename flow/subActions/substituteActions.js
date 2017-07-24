require('isomorphic-fetch');

export const SUBSTITUTE_PLAYER = 'SUBSTITUTE_PLAYER';
export const subPlayer = (fantasyClub, playerIn, playerOut, statusCode) => {
  return {
    type: SUBSTITUTE_PLAYER,
    fantasyClub,
    playerIn,
    playerOut,
    statusCode
  };
};

export const SUBSTITUTE_FAIL = 'SUBSTITUTE_FAIL';
export const substituteFail = (fantasyClub, playerIn, playerOut, statusCode) => {
  return {
    type: SUBSTITUTE_PLAYER,
    fantasyClub,
    playerIn,
    playerOut,
    statusCode
  };
};

export const fetchPlayer = (fantasyClub, thisPlayerIn, thisPlayerOut)  => dispatch => {
  return fetch('/something', {
    request: {
      fantasyClub,
      thisPlayerIn,
      thisPlayerOut
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(substituteFail(fantasyClub, null, null, res.status));
        return;
      } else {
        dispatch(substituteFail(fantasyClub, null, null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then((fantasyClub, thisPlayer) => {
    dispatch(subPlayer(fantasyClub, thisPlayerIn, thisPlayerOut, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};