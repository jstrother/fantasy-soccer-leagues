require('isomorphic-fetch');

export const SET_AS_RESERVE = 'SET_AS_RESERVE';
export const selectReserves = (fantasyClub, player, statusCode) => {
  return {
    type: SET_AS_RESERVE,
    fantasyClub,
    player,
    statusCode
  };
};

export const SET_AS_BENCHER = 'SET_AS_BENCHER';
export const selectBenchers = (fantasyClub, player, statusCode) => {
  return {
    type: SET_AS_BENCHER,
    fantasyClub,
    player,
    statusCode
  };
};

export const SET_AS_STARTER = 'SET_AS_STARTER';
export const selectStarters = (fantasyClub, player, statusCode) => {
  return {
    type: SET_AS_STARTER,
    fantasyClub,
    player,
    statusCode
  };
};

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

export const PLAYER_FAIL = 'PLAYER_FAIL';
export const playerFail = (fantasyClub, player, statusCode) => {
  return {
    type: PLAYER_FAIL,
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
        dispatch(playerFail(fantasyClub, null, res.status));
        return;
      } else {
        dispatch(playerFail(fantasyClub, null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then((fantasyClub, thisPlayer) => {
    
  })
  .catch(error => {
    throw new Error(error);
  });
};