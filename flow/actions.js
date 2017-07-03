// ./flow/actions.js
// imported into reducer files

require('isomorphic-fetch');

export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const setUserSuccess = (currentUser, statusCode) => ({
  type: SET_USER_SUCCESS,
  currentUser,
  statusCode
});

export const SET_USER_FAIL = 'SET_USER_FAIL';
export const setUserFail = (currentUser, statusCode) => ({
  type: SET_USER_FAIL,
  currentUser,
  statusCode
});

export const fetchUser = accessToken => dispatch => {
  return fetch('/user', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(setUserFail(null, res.status));
        return;
      } else {
        dispatch(setUserFail(null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(currentUser => {
    console.log('currentUser', currentUser);
    dispatch(setUserSuccess(currentUser, 200));
    return;
  })
  .catch(error => {
    throw new Error(error);
  });
};

export const updateRoster = (fantasyClub, player) => {
  return {
    type: 'UPDATE_ROSTER_22_PLAYERS',
    fantasyClub,
    player
  };
};

export const setMatchLineup = (fantasyClub, player) => {
  return {
    type: 'SET_LINEUP_18_PLAYERS',
    fantasyClub,
    player
  };
};

export const subPlayer = (fantasyClub, playerIn, playerOut) => {
  return {
    type: 'SUBSTITUTE_PLAYER',
    fantasyClub,
    playerIn,
    playerOut
  };
};

export const fetchScheduleSuccess = (schedule) => {
  return {
    type: 'FETCH_SCHEDULE_SUCCESS',
    schedule
  };
};

export const fetchScheduleError = (schedule, error) => {
  return {
    type: 'FETCH_SCHEDULE_ERROR',
    schedule,
    error
  };
};

export const fetchFantasyClubSuccess = (fantasyClub) => {
  return {
    type: 'FETCH_FANTASY_CLUB_SUCCESS',
    fantasyClub
  };
};

export const fetchFantasyClubError = (fantasyClub, error) => {
  return {
    type: 'FETCH_FANTASY_CLUB_ERROR',
    fantasyClub,
    error
  };
};

export const fetchFantasyChampsLeagueSuccess = (fantasyChampsLeague) => {
  return {
    type: 'FETCH_FANTASY_CHAMPS_LEAGUE_SUCCESS',
    fantasyChampsLeague
  };
};

export const fetchFantasyChampsLeagueError = (fantasyClub, error) => {
  return {
    type: 'FETCH_FANTASY_CHAMPS_LEAGUE_ERROR',
    fantasyClub,
    error
  };
};

export const fetchFantasyLeagueSuccess = (fantasyLeague) => {
  return {
    type: 'FETCH_FANTASY_LEAGUE_SUCCESS',
    fantasyLeague
  };
};

export const fetchFantasyLeagueError = (fantasyLeague, error) => {
  return {
    type: 'FETCH_FANTASY_LEAGUE_ERROR',
    fantasyLeague,
    error
  };
};

export const fetchFantasyMatchSuccess = (fantasyMatch) => {
  return {
    type: 'FETCH_FANTASY_MATCH_SUCCESS',
    fantasyMatch
  };
};

export const fetchFantasyMatchError = (fantasyMatch, error) => {
  return {
    type: 'FETCH_FANTASY_MATCH_ERROR',
    fantasyMatch,
    error
  };
};

export const fetchFantasyScheduleSuccess = (fantasySchedule) => {
  return {
    type: 'FETCH_FANTASY_SCHEDULE_SUCCESS',
    fantasySchedule
  };
};

export const fetchFantasyScheduleError = (fantasySchedule, error) => {
  return {
    type: 'FETCH_FANTASY_SCHEDULE_ERROR',
    fantasySchedule,
    error
  };
};