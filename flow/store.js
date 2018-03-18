// flow/store.js
// imported into ../components/index.js

import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers.js';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { warningFadeMiddleware } from './middleware/warningFade.js';
import { fantasyScheduleCheckMiddleware } from './middleware/fantasyScheduleCheck.js';

const logger = createLogger(),
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware = applyMiddleware(logger, thunk, warningFadeMiddleware, fantasyScheduleCheckMiddleware);

export default createStore(reducers, devTools, middleware);