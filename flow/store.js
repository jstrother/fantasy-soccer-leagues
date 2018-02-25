// flow/store.js
// imported into ../components/index.js

import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers.js';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { warningFadeMiddleware } from './middleware/warningFade.js';
import { startingElevenAlertMiddleware } from './middleware/startingElevenAlertFade.js';
import { benchPlayersAlertMiddleware } from './middleware/benchPlayersAlertFade.js';

const logger = createLogger(),
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware = applyMiddleware(logger, thunk, warningFadeMiddleware, startingElevenAlertMiddleware, benchPlayersAlertMiddleware);

export default createStore(reducers, devTools, middleware);