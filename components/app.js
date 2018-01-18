/* eslint-disable no-unused-vars, no-mixed-spaces-and-tabs*/
// components/app.js
// imported into ./index.js

import React from 'react';
import CSSModules from 'react-css-modules';

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