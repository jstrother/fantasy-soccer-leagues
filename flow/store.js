// flow/store.js
// imported into ../components/index.js

import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from './reducers.js';

const logger = createLogger();

export default createStore(reducers, applyMiddleware(logger));