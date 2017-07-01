// components/app.js
// imported into ./index.js

import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from './header.js';
import Login from './home.js';

export default class App extends React.Component {
	render() {
		return(
			<div>
	    	<Header />
	    	<Login />
			</div>
		);
	}
}

// export default withRouter(App);