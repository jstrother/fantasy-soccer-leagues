/* eslint-disable no-console*/
import fetch from 'isomorphic-fetch';
import { DEV_DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/league`;

export const LEAGUE_SUCCESS = 'LEAGUE_SUCCESS';
export const leagueSuccess = (playerList, statusCode) => ({
  type: LEAGUE_SUCCESS,
  playerList,
  statusCode
});

export const LEAGUE_FAIL = 'LEAGUE_FAIL';
export const leagueFail = statusCode => ({
  type: LEAGUE_FAIL,
  statusCode
});

export const PLAYER_POSITION_SELECT = 'PLAYER_POSITION_SELECT';
export const playerPositionSelect = position => ({
  type: PLAYER_POSITION_SELECT,
  position
});

export const PLAYER_CLUB_SELECT = 'PLAYER_CLUB_SELECT';
export const playerClubSelect = club => ({
  type: PLAYER_CLUB_SELECT,
  club
});

export const fetchLeague = leagueId => dispatch => {
  return fetch(`${thisURL}/${leagueId}`)
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(leagueFail(res.status));
        return;
      } 
      dispatch(leagueFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(playerList => {
    dispatch(leagueSuccess(playerList, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};