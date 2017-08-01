export const SELECT_LEAGUE = 'SELECT_LEAGUE';
export const selectLeague = (leagueId, leagueName) => {
  return {
    type: SELECT_LEAGUE,
    league: {
      leagueId,
      leagueName
    }
  };
};

export const LEAGUE_FAIL = 'LEAGUE_FAIL';
export const leagueFail = (league) => {
  return {
    type: LEAGUE_FAIL,
    league
  };
};