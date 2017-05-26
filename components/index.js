// components/index.js
// top-level react component

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './app.js';
import store from '../flow/store.js';

// FantasyListener(store);
injectTapEventPlugin();

const Routes = (
  <Router>
  	<ul>
  		<li><Link to='/'>Home</Link></li>
  	</ul>
    <Route path="/" component={App} />
  </Router>
);

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('app')
);