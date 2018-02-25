// ./flow/reducers.js
// imported into ./flow/store.js

import { combineReducers } from 'redux';
import { userReducer } from './subReducers/userReducer.js';
import { playerReducer } from './subReducers/playerReducer.js';
import { leagueReducer } from './subReducers/leagueReducer.js';
import { fantasyClubReducer } from './subReducers/fantasyClubReducer.js';
import { rosterWarningReducer } from './subReducers/rosterWarningReducer.js';
import { startingElevenAlertReducer } from './subReducers/startingElevenAlertReducer.js';
import { benchPlayersAlertReducer } from './subReducers/benchPlayersAlertReducer.js';

export const reducers = combineReducers({
  userReducer,
  playerReducer,
  leagueReducer,
  fantasyClubReducer,
  rosterWarningReducer,
  startingElevenAlertReducer,
  benchPlayersAlertReducer
});