// components/user.js

import React from 'react';

import SignUpDialog from './signUpDialog.js';
import FantasyClub from './fantasyClub.js';
import FantasySchedule from './fantasySchedule.js';
import FantasyLeague from './fantasyLeague.js';
import FantasyChampsLeague from './fantasyChampsLeague.js';

export default class User extends React.Component {
	render() {
		
		return(
			<div>
				<div>User Page</div>
        <SignUpDialog />
				<FantasyClub />
				<FantasySchedule />
				<FantasyLeague />
				<FantasyChampsLeague />
			</div>
		);
	}
}