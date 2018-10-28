import fetch from 'isomorphic-fetch';
import { DIRECTORY as url } from '../../server/config.js';

const thisURL = `${url}/fantasyClub`;

export const GET_CLUB_SUCCESS = 'GET_CLUB_SUCCESS';
export const getClubSuccess = (userId, fantasyClub, statusCode) => ({
	type: GET_CLUB_SUCCESS,
	userId,
	fantasyClub,
	clubFetched: true,
	statusCode
});

export const GET_CLUB_FAIL = 'GET_CLUB_FAIL';
export const getClubFail = statusCode => ({
	type: GET_CLUB_FAIL,
	clubFetched: false,
	statusCode
});

export const NEW_CLUB_SUCCESS = 'NEW_CLUB_SUCCESS';
export const newClubSuccess = (userId, clubName, manager, statusCode) => ({
	type: NEW_CLUB_SUCCESS,
	userId,
	clubName,
	manager,
	statusCode
});

export const NEW_CLUB_FAIL = 'NEW_CLUB_FAIL';
export const newClubFail = statusCode => ({
	type: NEW_CLUB_FAIL,
	statusCode
});

export const GET_ROSTER_SUCCESS = 'GET_ROSTER_SUCCESS';
export const getRosterSuccess = (userId, roster, statusCode) => ({
	type: GET_ROSTER_SUCCESS,
	userId,
	roster,
	statusCode
});

export const GET_ROSTER_FAIL = 'GET_ROSTER_FAIL';
export const getRosterFail = statusCode => ({
	type: GET_ROSTER_FAIL,
	statusCode
});

export const SET_GOALKEEPER_SUCCESS = 'SET_GOALKEEPER_SUCCESS';
export const setGoalkeeperSuccess = (userId, goalkeeper, statusCode) => ({
	type: SET_GOALKEEPER_SUCCESS,
	userId,
	goalkeeper,
	statusCode
});

export const SET_GOALKEEPER_FAIL = 'SET_GOALKEEPER_FAIL';
export const setGoalkeeperFail = statusCode => ({
	type: SET_GOALKEEPER_FAIL,
	statusCode
});

export const REMOVE_GOALKEEPER_SUCCESS = 'REMOVE_GOALKEEPER_SUCCESS';
export const removeGoalkeeperSuccess = (userId, goalkeeper, statusCode) => ({
	type: REMOVE_GOALKEEPER_SUCCESS,
	userId,
	goalkeeper,
	statusCode
});

export const REMOVE_GOALKEEPER_FAIL = 'REMOVE_GOALKEEPER_FAIL';
export const removeGoalkeeperFail = statusCode => ({
	type: REMOVE_GOALKEEPER_FAIL,
	statusCode
});

export const SET_DEFENDER_SUCCESS = 'SET_DEFENDER_SUCCESS';
export const setDefenderSuccess = (userId, defender, statusCode) => ({
	type: SET_DEFENDER_SUCCESS,
	userId,
	defender,
	statusCode
});

export const SET_DEFENDER_FAIL = 'SET_DEFENDER_FAIL';
export const setDefenderFail = statusCode => ({
	type: SET_DEFENDER_FAIL,
	statusCode
});

export const REMOVE_DEFENDER_SUCCESS = 'REMOVE_DEFENDER_SUCCESS';
export const removeDefenderSuccess = (userId, defender, statusCode) => ({
	type: REMOVE_DEFENDER_SUCCESS,
	userId,
	defender,
	statusCode
});

export const REMOVE_DEFENDER_FAIL = 'REMOVE_DEFENDER_FAIL';
export const removeDefenderFail = statusCode => ({
	type: REMOVE_DEFENDER_FAIL,
	statusCode
});

export const SET_MIDFIELDER_SUCCESS = 'SET_MIDFIELDER_SUCCESS';
export const setMidfielderSuccess = (userId, midfielder, statusCode) => ({
	type: SET_MIDFIELDER_SUCCESS,
	userId,
	midfielder,
	statusCode
});

export const SET_MIDFIELDER_FAIL = 'SET_MIDFIELDER_FAIL';
export const setMidfielderFail = statusCode => ({
	type: SET_MIDFIELDER_FAIL,
	statusCode
});

export const REMOVE_MIDFIELDER_SUCCESS = 'REMOVE_MIDFIELDER_SUCCESS';
export const removeMidfielderSuccess = (userId, midfielder, statusCode) => ({
	type: REMOVE_MIDFIELDER_SUCCESS,
	userId,
	midfielder,
	statusCode
});

export const REMOVE_MIDFIELDER_FAIL = 'REMOVE_MIDFIELDER_FAIL';
export const removeMidfielderFail = statusCode => ({
	type: REMOVE_MIDFIELDER_FAIL,
	statusCode
});

export const SET_FORWARD_SUCCESS = 'SET_FORWARD_SUCCESS';
export const setForwardSuccess = (userId, forward, statusCode) => ({
	type: SET_FORWARD_SUCCESS,
	userId,
	forward,
	statusCode
});

export const SET_FORWARD_FAIL = 'SET_FORWARD_FAIL';
export const setForwardFail = statusCode => ({
	type: SET_FORWARD_FAIL,
	statusCode
});

export const REMOVE_FORWARD_SUCCESS = 'REMOVE_FORWARD_SUCCESS';
export const removeForwardSuccess = (userId, forward, statusCode) => ({
	type: REMOVE_FORWARD_SUCCESS,
	userId,
	forward,
	statusCode
});

export const REMOVE_FORWARD_FAIL = 'REMOVE_FORWARD_FAIL';
export const removeForwardFail = statusCode => ({
	type: REMOVE_FORWARD_FAIL,
	statusCode
});

export const ADD_STARTER_SUCCESS = 'ADD_STARTER_SUCCESS';
export const addStarterSuccess = (userId, starter, statusCode) => ({
	type: ADD_STARTER_SUCCESS,
	userId,
	starter,
	statusCode
});

export const ADD_STARTER_FAIL = 'ADD_STARTER_FAIL';
export const addStarterFail = statusCode => ({
	type: ADD_STARTER_FAIL,
	statusCode
});

export const REMOVE_STARTER_SUCCESS = 'REMOVE_STARTER_SUCCESS';
export const removeStarterSuccess = (userId, starter, statusCode) => ({
	type: REMOVE_STARTER_SUCCESS,
	userId,
	starter,
	statusCode
});

export const REMOVE_STARTER_FAIL = 'REMOVE_STARTER_FAIL';
export const removeStarterFail = statusCode => ({
	type: REMOVE_STARTER_FAIL,
	statusCode
});

export const ADD_BENCHWARMER_SUCCESS = 'ADD_BENCHWARMER_SUCCESS';
export const addBenchwarmerSuccess = (userId, benchwarmer, statusCode) => ({
	type: ADD_BENCHWARMER_SUCCESS,
	userId,
	benchwarmer,
	statusCode
});

export const ADD_BENCHWARMER_FAIL = 'ADD_BENCHWARMER_FAIL';
export const addBenchwarmerFail = statusCode => ({
	type: ADD_BENCHWARMER_FAIL,
	statusCode
});

export const REMOVE_BENCHWARMER_SUCCESS = 'REMOVE_BENCHWARMER_SUCCESS';
export const removeBenchwarmerSuccess = (userId, benchwarmer, statusCode) => ({
	type: REMOVE_BENCHWARMER_SUCCESS,
	userId,
	benchwarmer,
	statusCode
});

export const REMOVE_BENCHWARMER_FAIL = 'REMOVE_BENCHWARMER_FAIL';
export const removeBenchwarmerFail = statusCode => ({
	type: REMOVE_BENCHWARMER_FAIL,
	statusCode
});

export const getClub = (accessToken, userId) => dispatch => {
	return fetch(`${thisURL}/${userId}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(getClubFail(res.status));
					return;
				}
				dispatch(getClubFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(fantasyClub => {
			dispatch(getClubSuccess(userId, fantasyClub, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const newClub = (userId, accessToken, clubName, manager) => dispatch => {
	return fetch(`${thisURL}/newClub`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			clubName,
			manager
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(newClubFail(res.status));
					return;
				}
				dispatch(newClubFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(newClubSuccess(userId, data.clubName, data.manager, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const addGoalkeeper = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/addGoalkeeper/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(setGoalkeeperFail(res.status));
					return;
				}
				dispatch(setGoalkeeperFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(setGoalkeeperSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const removeGoalkeeper = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/removeGoalkeeper/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(removeGoalkeeperFail(res.status));
					return;
				}
				dispatch(removeGoalkeeperFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(removeGoalkeeperSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const addDefender = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/addDefender/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(setDefenderFail(res.status));
					return;
				}
				dispatch(setDefenderFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(setDefenderSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const removeDefender = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/removeDefender/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(removeDefenderFail(res.status));
					return;
				}
				dispatch(removeDefenderFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(removeDefenderSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const addMidfielder = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/addMidfielder/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(setMidfielderFail(res.status));
					return;
				}
				dispatch(setMidfielderFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(setMidfielderSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const removeMidfielder = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/removeMidfielder/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(removeMidfielderFail(res.status));
					return;
				}
				dispatch(removeMidfielderFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(removeMidfielderSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const addForward = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/addForward/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(setForwardFail(res.status));
					return;
				}
				dispatch(setForwardFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(setForwardSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const removeForward = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/removeForward/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(removeForwardFail(res.status));
					return;
				}
				dispatch(removeForwardFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(removeForwardSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const addStarter = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/addStarter/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(addStarterFail(res.status));
					return;
				}
				dispatch(addStarterFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(addStarterSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const removeStarter = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/removeStarter/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(removeStarterFail(res.status));
					return;
				}
				dispatch(removeStarterFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(removeStarterSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const addBench = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/addBench/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(addBenchwarmerFail(res.status));
					return;
				}
				dispatch(addBenchwarmerFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(addBenchwarmerSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const removeBench = (accessToken, userId, player) => dispatch => {
	return fetch(`${thisURL}/removeBench/${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			player
		})
	})
		.then(res => {
			if (!res.ok) {
				if (res.status === 400) {
					dispatch(removeBenchwarmerFail(res.status));
					return;
				}
				dispatch(removeBenchwarmerFail(500));
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then(data => {
			dispatch(removeBenchwarmerSuccess(userId, data, 200));
		})
		.catch(error => {
			throw new Error(error);
		});
};
