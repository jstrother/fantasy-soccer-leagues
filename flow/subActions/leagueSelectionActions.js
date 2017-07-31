export const SELECT_LEAGUE = 'SELECT_LEAGUE';
export const selectLeague = (league, statusCode) => {
  return {
    type: SELECT_LEAGUE,
    league,
    statusCode
  };
};

export const LEAGUE_FAIL = 'LEAGUE_FAIL';
export const leagueFail = (league, statusCode) => {
  return {
    type: LEAGUE_FAIL,
    league,
    statusCode
  };
};