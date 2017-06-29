// ./flow/reducers.js
// imported into ./flow/store.js

import { combineReducers } from 'redux';
import { loginReducer } from './subReducers/loginReducer.js';
import { setMatchLineupReducer } from './subReducers/setMatchLineupReducer.js';
import { subPlayerReducer } from './subReducers/subPlayerReducer.js';
import { updateRosterReducer } from './subReducers/updateRosterReducer.js';
console.log(loginReducer);
export const reducers = combineReducers({
  loginReducer,
  setMatchLineupReducer,
  subPlayerReducer,
  updateRosterReducer
});