/* eslint-disable no-unused-vars*/
// components/index.js
// top-level react component

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './app.js';
import store from '../flow/store.js';

injectTapEventPlugin();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);