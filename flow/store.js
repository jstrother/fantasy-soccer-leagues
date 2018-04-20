/* eslint-disable no-console, no-unused-vars */
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
  
  selectSchedule = state => {
    return state.fantasyScheduleReducer.fantasySchedule;
  },
  
  handleScheduleChange = () => {
    let fantasySchedule = selectSchedule(store.getState());
    if (Array.isArray(fantasySchedule) && fantasySchedule.length === 0) {
      store.dispatch(createSchedule());
    }
  },
  
  store = createStore(reducers, devTools, middleware),
  unsubscribe = store.subscribe(handleScheduleChange);

unsubscribe();
setInterval(() => handleScheduleChange(), 1000);

export default store;