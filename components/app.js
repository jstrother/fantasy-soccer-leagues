// components/app.js
// imported into ./index.js

import React from 'react';
import { connect } from 'react-redux';

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

function mapStateToProps(users) {
    return { users };
}

export default connect(mapStateToProps)(App);