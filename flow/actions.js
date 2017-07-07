// ./flow/actions.js
// imported into reducer files

require('isomorphic-fetch');

export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const setUserSuccess = (currentUser)  => ({
  type: SET_USER_SUCCESS,
  currentUser
  });

export const SET_USER_FAIL = 'SET_USER_FAIL';
export const setUserFail = (currentUser)  => ({
  type: SET_USER_FAIL,
  currentUser
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

export const UPDATE_ROSTER = 'UPDATE_ROSTER';
export const updateRoster = (fantasyClub, roster) => {
  return {
    type: UPDATE_ROSTER,
    fantasyClub,
    roster
  };
};

export const SET_LINEUP = 'SET_LINEUP';
export const setMatchLineup = (fantasyClub, lineup) => {
  return {
    type: SET_LINEUP,
    fantasyClub,
    lineup
  };
};

export const SELECT_STARTERS = 'SELECT_STARTERS';
export const selectStarters = (fantasyClub, starters) => {
  return {
    type: SELECT_STARTERS,
    fantasyClub,
    starters
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

export const FETCH_FANTASY_CLUB_SUCCESS = 'FETCH_FANTASY_CLUB_SUCCESS';
export const fetchFantasyClubSuccess = (fantasyClub) => {
  return {
    type: FETCH_FANTASY_CLUB_SUCCESS,
    fantasyClub
  };
};

export const FETCH_FANTASY_CLUB_ERROR = 'FETCH_FANTASY_CLUB_ERROR';
export const fetchFantasyClubError = (fantasyClub, error) => {
  return {
    type: FETCH_FANTASY_CLUB_ERROR,
    fantasyClub,
    error
  };
};

export const FETCH_FANTASY_CHAMPS_LEAGUE_SUCCESS = 'FETCH_FANTASY_CHAMPS_LEAGUE_SUCCESS';
export const fetchFantasyChampsLeagueSuccess = (fantasyChampsLeague) => {
  return {
    type: FETCH_FANTASY_CHAMPS_LEAGUE_SUCCESS,
    fantasyChampsLeague
  };
};

export const FETCH_FANTASY_CHAMPS_LEAGUE_ERROR = 'FETCH_FANTASY_CHAMPS_LEAGUE_ERROR';
export const fetchFantasyChampsLeagueError = (fantasyClub, error) => {
  return {
    type: FETCH_FANTASY_CHAMPS_LEAGUE_ERROR,
    fantasyClub,
    error
  };
};

export const FETCH_FANTASY_LEAGUE_SUCCESS = 'FETCH_FANTASY_LEAGUE_SUCCESS';
export const fetchFantasyLeagueSuccess = (fantasyLeague) => {
  return {
    type: FETCH_FANTASY_LEAGUE_SUCCESS,
    fantasyLeague
  };
};

export const FETCH_FANTASY_LEAGUE_ERROR = 'FETCH_FANTASY_LEAGUE_ERROR';
export const fetchFantasyLeagueError = (fantasyLeague, error) => {
  return {
    type: FETCH_FANTASY_LEAGUE_ERROR,
    fantasyLeague,
    error
  };
};

export const FETCH_FANTASY_MATCH_SUCCESS = 'FETCH_FANTASY_MATCH_SUCCESS';
export const fetchFantasyMatchSuccess = (fantasyMatch) => {
  return {
    type: FETCH_FANTASY_MATCH_SUCCESS,
    fantasyMatch
  };
};

export const FETCH_FANTASY_MATCH_ERROR = 'FETCH_FANTASY_MATCH_ERROR';
export const fetchFantasyMatchError = (fantasyMatch, error) => {
  return {
    type: FETCH_FANTASY_MATCH_ERROR,
    fantasyMatch,
    error
  };
};

export const FETCH_FANTASY_SCHEDULE_SUCCESS = 'FETCH_FANTASY_SCHEDULE_SUCCESS';
export const fetchFantasyScheduleSuccess = (fantasySchedule) => {
  return {
    type: FETCH_FANTASY_SCHEDULE_SUCCESS,
    fantasySchedule
  };
};

export const FETCH_FANTASY_SCHEDULE_ERROR = 'FETCH_FANTASY_SCHEDULE_ERROR';
export const fetchFantasyScheduleError = (fantasySchedule, error) => {
  return {
    type: FETCH_FANTASY_SCHEDULE_ERROR,
    fantasySchedule,
    error
  };
};