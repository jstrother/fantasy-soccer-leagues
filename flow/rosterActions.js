require('isomorphic-fetch');

export const SET_AS_RESERVES = 'SET_AS_RESERVES';
export const selectReserves = (fantasyClub, players) => {
  return {
    type: SET_AS_RESERVES,
    fantasyClub,
    players
  };
};

export const SET_AS_BENCHERS = 'SET_AS_BENCHERS';
export const selectBenchers = (fantasyClub, players) => {
  return {
    type: SET_AS_BENCHERS,
    fantasyClub,
    players
  };
};

export const SET_AS_STARTERS = 'SET_AS_STARTERS';
export const selectStarters = (fantasyClub, players) => {
  return {
    type: SET_AS_STARTERS,
    fantasyClub,
    players
  };
};

export const SUBSTITUTE_PLAYER = 'SUBSTITUTE_PLAYER';
export const subPlayer = (fantasyClub, playerIn, playerOut) => {
  return {
    type: SUBSTITUTE_PLAYER,
    fantasyClub,
    playerIn,
    playerOut
  };
};