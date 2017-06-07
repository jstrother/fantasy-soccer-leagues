// ./flow/actions.js
// imported into ./flow/reducers.js

export const login = (userName, userPassword) => {
  return {
    type: 'login',
    userName,
    userPassword
  };
};

export const signUp = (name, email, userName, userPassword, teamName) => {
  return {
    type: 'sign_up',
    name,
    email,
    userName,
    userPassword,
    teamName
  };
};

export const updateRoster = (fantasyTeam, player) => {
  return {
    type: 'update_roster_22_players',
    fantasyTeam,
    player
  };
};

export const setMatchLineup = (fantasyTeam, player) => {
  return {
    type: 'set_lineup_18_players',
    fantasyTeam,
    player
  };
};

export const subPlayer = (fantasyTeam, player) => {
  return {
    type: 'substitue_player',
    fantasyTeam,
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