/* eslint-disable no-console, no-unused-vars */
// flow/store.js
// imported into ../components/index.js

import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers.js';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createSchedule } from './subActions/fantasyScheduleActions.js';
import { warningFadeMiddleware } from './middleware/warningFade.js';
// import { fantasyScheduleCheckMiddleware } from './middleware/fantasyScheduleCheck.js';

const logger = createLogger(),
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware = applyMiddleware(logger, thunk, warningFadeMiddleware),
  
  selectMatches = state => {
    return state.fantasyScheduleReducer.fantasySchedule.matches;
  },
  
  handleMatchesChange = () => {
    let matches = selectMatches(store.getState());
    if (Array.isArray(matches) && matches.length < 38) {
      store.dispatch(createSchedule());
    }
  },
  
  store = createStore(reducers, devTools, middleware),
  unsubscribe = store.subscribe(handleMatchesChange);

unsubscribe();
setInterval(() => handleMatchesChange(), 1000);

export default store;