// components/user.js
// imported into fantasyGame.js

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import FantasyClub from './fantasyClub.js';
import Schedule from './schedule.js';
import FantasySchedule from './fantasySchedule.js';
import FantasyLeague from './fantasyLeague.js';
import FantasyChampsLeague from './fantasyChampsLeague.js';

export default class User extends React.Component {
	initialSetup = state => {if (!state.user.name) {
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
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];
		
		return(
			<div>
				<div>User Page</div>
        <Dialog
          title="New User Setup"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          To finish setup, please fill out the following fields:
          <TextField
          	name="userName"
          	onChange={null}
          	floatingLabelText="Please enter your name."
          	errorText="This field is required."
          	className="newUserNameField" /> {/*the onChange function is to input the text input into the db associated with the google ID*/}
          <TextField
          	name="clubName"
          	onChange={null}
          	floatingLabelText="Please enter your club name."
          	errorText="This field is required."
          	className="newClubNameField" /> {/*the onChange function is to input the text input into the db associated with the google ID*/}
        </Dialog>
				<FantasyClub />
				<FantasySchedule />
				<FantasyLeague />
				<FantasyChampsLeague />
				<Schedule />
			</div>
		);
	}
}