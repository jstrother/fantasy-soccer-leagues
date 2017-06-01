// components/index.js
// top-level react component

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './app.js';
import store from '../flow/store.js';

// <ul>
//   		<li><Link to='/'>Home</Link></li>
//   	</ul>
//     <Route path="/" component={App} />

// FantasyListener(store);
injectTapEventPlugin();

// the issue lies in Routes (which is setup just like the example from documentation)
const Routes = (
  <Router>
  <div>
			hello
		</div>
  	
  </Router>
);

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('app')
);