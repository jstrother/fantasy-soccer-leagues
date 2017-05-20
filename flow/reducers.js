// ./flow/reducers.js
// imported into ./flow/store.js

import { combineReducers } from 'redux';
import loginReducer from './subReducers/loginReducer.js';
import setMatchLineupReducer from './subReducers/setMatchLineupReducer.js';
import signUpReducer from './subReducers/signUpReducer.js';
import subPlayerReducer from './subReducers/subPlayerReducer.js';
import updateRosterReducer from './subReducers/updateRosterReducer.js';

export const reducers = combineReducers({
  loginReducer,
  setMatchLineupReducer,
  signUpReducer,
  subPlayerReducer,
  updateRosterReducer
});