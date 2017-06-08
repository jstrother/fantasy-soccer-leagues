// ./flow/actions.js
// imported into ./flow/reducers.js

import createData from '../../programFunctions/crud_functions.js';
import User from '../../models/user_model.js';

require('isomorphic-fetch');

export const signUp = (name, userEmail, userName, userPassword, teamName) => {
  return {
    type: 'SIGN_UP',
    name,
    userEmail,
    userName,
    userPassword,
    teamName
  };
};

export const signUpActionCreator = (name, userEmail, userName, userPassword, teamName) => {
  createData({
      name,
      userName,
      userPassword,
      userEmail,
      fantasyClub: teamName
    }, User);
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