import fetch from 'isomorphic-fetch';
import {DEV_DIRECTORY as url} from '../../server/config.js';

const thisURL = `${url}/leagueStandings`;

export const LEAGUE_STANDINGS_SUCCESS = 'LEAGUE_STANDINGS_SUCCESS';
export const leagueStandingsSuccess = (currentStandings, statusCode) => ({
  type: LEAGUE_STANDINGS_SUCCESS,
  currentStandings,
  statusCode
});

export const LEAGUE_STANDINGS_FAIL = 'LEAGUE_STANDINGS_FAIL';
export const leagueStandingsFail = statusCode => ({
  type: LEAGUE_STANDINGS_FAIL,
  statusCode
});

export const leagueStandings = accessToken => dispatch => {
  return fetch(`${thisURL}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(leagueStandingsFail(res.status));
        return;
      }
      dispatch(leagueStandingsFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(currentStandings => {
    dispatch(leagueStandingsSuccess(currentStandings, 200));
  })
  .catch(error => {
    throw new Error(error);
  });
};