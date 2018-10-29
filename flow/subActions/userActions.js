/* eslint-disable no-console */

import fetch from 'isomorphic-fetch';
import { DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/user`;

export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const setUserSuccess = (currentUser, statusCode) => ({
	type: SET_USER_SUCCESS,
	currentUser,
	statusCode
});

export const SET_USER_FAIL = 'SET_USER_FAIL';
export const setUserFail = statusCode => ({
	type: SET_USER_FAIL,
	statusCode
});

export const SET_LEAGUE_SUCCESS = 'SET_LEAGUE_SUCCESS';
export const setLeagueSuccess = (
	fantasyLeagueId,
	fantasyLeagueName,
	statusCode
) => ({
	type: SET_LEAGUE_SUCCESS,
	fantasyLeagueId,
	fantasyLeagueName,
	statusCode
});

export const SET_LEAGUE_FAIL = 'SET_LEAGUE_FAIL';
export const setLeagueFail = statusCode => ({
	type: SET_LEAGUE_FAIL,
	statusCode
});

export const HAS_CLUB_SUCCESS = 'HAS_CLUB_SUCCESS';
export const hasClubSuccess = (hasClub, statusCode) => ({
	type: HAS_CLUB_SUCCESS,
	hasClub,
	statusCode
});

export const HAS_CLUB_FAIL = 'HAS_CLUB_FAIL';
export const hasClubFail = statusCode => ({
	type: HAS_CLUB_FAIL,
	statusCode
});

export const fetchUser = accessToken => dispatch => {
	return fetch(`${thisURL}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(setUserFail(res.status));
					return;
				}
				dispatch(setUserFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(currentUser => {
			dispatch(setUserSuccess(currentUser, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const selectLeague = (userId, accessToken,	fantasyLeagueId, fantasyLeagueName) => dispatch => {
	return fetch(`${thisURL}/selectLeague`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			fantasyLeagueId,
			fantasyLeagueName
		})
	})
  .then(res => {
    if (!res.ok) {
      if (res.status === 400) {
        dispatch(setLeagueFail(res.status));
        return;
      }
      dispatch(setLeagueFail(500));
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    if (data._id === userId) {
      dispatch(
        setLeagueSuccess(data.fantasyLeagueId, data.fantasyLeagueName, 200)
      );
    } else {
      console.error('Could not select a league. UserID mismatch.');
    }
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const clubOwner = (userId, accessToken, hasClub) => dispatch => {
	console.log('first userId:', userId);
	return fetch(`${thisURL}/clubOwner`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			hasClub
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(hasClubFail(res.status));
					return;
				}
				dispatch(hasClubFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			console.log('hasClub data:', data);
			console.log('second userId:', userId);
			if (data._id === userId) {
				dispatch(hasClubSuccess(data.hasClub, 200));
			} else {
				console.error('Could not determine if user has club. UserID mismatch');
			}
		})
		.catch(error => {
			throw new Error(error);
		});
};
