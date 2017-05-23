// components/index.js
// top-level react component

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch, hashHistory } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './app.js';
import store from '../flow/store.js';

// FantasyListener(store);
injectTapEventPlugin();

const routes = (
    <Router history={hashHistory}>
    {/*
    	don't forget to create your container for Route's component attribute
    */}
      <Route path="/" component={App} />
      <Route path="/user/" component={App} />
    </Router>
);

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<Routes />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
);