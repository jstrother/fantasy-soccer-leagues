// flow/store.js
// imported into ../components/index.js

import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers.js';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

export default createStore(reducers, applyMiddleware(logger, thunk));