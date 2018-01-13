// ./flow/reducers.js
// imported into ./flow/store.js

import { combineReducers } from 'redux';
import { loginReducer } from './subReducers/loginReducer.js';
import { playerReducer } from './subReducers/playerReducer.js';
import { leagueReducer } from './subReducers/leagueReducer.js';
// import { subPlayerRedcer } from './subReducers/subPlayerReducer.js';

export const reducers = combineReducers({
  loginReducer,
  playerReducer,
  leagueReducer,
  // subPlayerRedcer
});