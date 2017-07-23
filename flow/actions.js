// ./flow/actions.js
// imported into reducer files

require('isomorphic-fetch');

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