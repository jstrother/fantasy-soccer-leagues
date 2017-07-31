require('isomorphic-fetch');

export const SUBSTITUTE_PLAYER = 'SUBSTITUTE_PLAYER';
export const subPlayer = (playerIn, playerOut, statusCode) => {
  return {
    type: SUBSTITUTE_PLAYER,
    playerIn,
    playerOut,
    statusCode
  };
};

export const SUBSTITUTE_FAIL = 'SUBSTITUTE_FAIL';
export const substituteFail = (playerIn, playerOut, statusCode) => {
  return {
    type: SUBSTITUTE_PLAYER,
    playerIn,
    playerOut,
    statusCode
  };
};