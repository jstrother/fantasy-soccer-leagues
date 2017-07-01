// ./flow/actions.js
// imported into reducer files

require('isomorphic-fetch');

export const LOG_IN = 'LOG_IN';
export const userRequest = () => ({
  type: LOG_IN,
  loading: true
});

export const SET_USER = 'SET_USER';
export const setUser = (currentUser, statusCode) => ({
  type: SET_USER,
  currentUser,
  loading: false,
  statusCode
});

export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const setUserSuccess = (currentUser, statusCode) => ({
  type: SET_USER_SUCCESS,
  currentUser,
  loading: false,
  statusCode
});

export const SET_USER_FAIL = 'SET_USER_FAIL';
export const setUserFail = (currentUser, statusCode) => ({
  type: SET_USER_FAIL,
  currentUser,
  loading: false,
  statusCode
});

export const fetchUser = accessToken => dispatch => {
  dispatch(userRequest());
  return fetch('/user', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        dispatch(setUser(null, res.status));
        return;
      } else {
        dispatch(setUserFail(null, 500));
      }
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(currentUser => {
    dispatch(setUserSuccess(currentUser, 200));
    return;
  })
  .catch(err => {
    throw new Error(err);
  });
}

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

export const subPlayer = (fantasyClub, player) => {
  return {
    type: 'SUBSTITUTE_PLAYER',
    fantasyClub,
    player
  };
};

export const fetchPlayerSuccess = (player) => {
  return {
    type: 'FETCH_PLAYER_SUCCESS',
    player
  };
};

export const fetchPlayerError = (player, error) => {
  return {
    type: 'FETCH_PLAYER_ERROR',
    player,
    error
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    user
  };
};

export const fetchUserError = (user, error) => {
  return {
    type: 'FETCH_USER_ERROR',
    user,
    error
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