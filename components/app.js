/* eslint-disable no-unused-vars, no-mixed-spaces-and-tabs*/
// components/app.js
// imported into ./index.js

import React from 'react';
import Header from './header.js';
import Login from './home.js';
import styles from '../scss/app.scss';

export default class App extends React.Component {
	render() {
		return(
			<div className={styles.app}>
	    	<Header />
	    	<Login />
			</div>
		);
	}
}