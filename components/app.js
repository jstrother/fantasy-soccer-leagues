// components/app.js
// imported into ./index.js

import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from './header.js';
import Main from './main.js';

class App extends React.Component {
	render() {
		return(
			<div>
	    	<Header />
	    	<Main />
			</div>
		);
	}
}

export default withRouter(App);