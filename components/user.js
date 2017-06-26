// components/user.js
// imported into fantasyGame.js

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import FantasyClub from './fantasyClub.js';
import Schedule from './schedule.js';
import FantasySchedule from './fantasySchedule.js';
import FantasyLeague from './fantasyLeague.js';
import FantasyChampsLeague from './fantasyChampsLeague.js';

export default class User extends React.Component {
	setState = (state) => {if (!state.user.name) {
		state = {
	    open: true,
	  };
	}
	else {
		state = {
	    open: false,
	  };
	}}

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

	
	render() {
		return(
			<div>
				<div>User Page</div>
				<FantasyClub />
				<FantasySchedule />
				<FantasyLeague />
				<FantasyChampsLeague />
				<Schedule />
			</div>
		);
	}
}