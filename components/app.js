// components/app.js
// imported into ./index.js

import React from 'react';
import { connect } from 'react-redux';
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

function mapStateToProps(user) {
    return { user };
}

function mapDispatchToProps(location) {
	return { location };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));