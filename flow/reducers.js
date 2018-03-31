// ./flow/reducers.js
// imported into ./flow/store.js

import { combineReducers } from 'redux';
import { userReducer } from './subReducers/userReducer.js';
import { playerReducer } from './subReducers/playerReducer.js';
import { leagueReducer } from './subReducers/leagueReducer.js';
import { fantasyClubReducer } from './subReducers/fantasyClubReducer.js';
import { warningReducer } from './subReducers/warningReducer.js';
import { fantasyScheduleReducer } from './subReducers/fantasyScheduleReducer.js';
import { fantasyMatchReducer } from './subReducers/fantasyMatchReducer.js';
import { rosterReducer } from './subReducers/rosterReducer.js';

export const reducers = combineReducers({
  userReducer,
  playerReducer,
  leagueReducer,
  fantasyClubReducer,
  warningReducer,
  fantasyScheduleReducer,
  fantasyMatchReducer,
  rosterReducer
});