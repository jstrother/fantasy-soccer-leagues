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

// the issue lies in Routes (which is setup just like the example from documentation)
const Routes = () => (
  <Router>
    <div>
    	<header id="main-header">The Fantasy Soccer-Football Super League</header>
	  	<div>
				<ul>
		  		<li id="home-link" className="link"><Link to='/'>Home</Link></li>
		  	</ul>
		    <Route path="/" component={App} />
			</div>
    </div>
  </Router>
);

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('app')
);