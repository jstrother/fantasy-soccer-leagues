// components/index.js
// top-level react component

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './app.js';
import store from '../flow/store.js';

injectTapEventPlugin();


ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
);