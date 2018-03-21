/* eslint-disable no-console */
// flow/store.js
// imported into ../components/index.js

import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers.js';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createSchedule } from './subActions/fantasyScheduleActions.js';
import { warningFadeMiddleware } from './middleware/warningFade.js';

const logger = createLogger(),
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware = applyMiddleware(logger, thunk, warningFadeMiddleware),
  
  selectMatches = state => {
    return state.fantasyScheduleReducer.fantasySchedule.matches;
  },
  
  handleMatchesChange = () => {
    let matches = selectMatches(store.getState());
    console.log('handleChange() matches:', matches);
    if (Array.isArray(matches) && matches.length === 0) {
      setTimeout(() => store.dispatch(createSchedule()), 7000);
    }
  },
  
  store = createStore(reducers, devTools, middleware);

store.subscribe(handleMatchesChange);

export default store;