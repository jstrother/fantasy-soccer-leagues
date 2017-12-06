// ./flow/reducers.js
// imported into ./flow/store.js

import { combineReducers } from 'redux';
import { loginReducer } from './subReducers/loginReducer.js';
import { setMatchLineupReducer } from './subReducers/setMatchLineupReducer.js';
import { playerReducer } from './subReducers/playerReducer.js';
// import { leagueSelectionReducer } from './subReducers/leagueSelectionReducer.js';

export const reducers = combineReducers({
  loginReducer,
  setMatchLineupReducer,
  playerReducer
});