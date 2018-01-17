// components/roster.js
// imported into fantasyClub.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';
import { fetchLeague } from '../flow/subActions/leagueActions.js';
import { fetchStarter, fetchBenchwarmer, fetchReserve } from '../flow/subActions/playerActions.js';
import styles from '../scss/roster.scss';



export class Team extends React.Component {
	// using fantasyLeagueId, display list of players from that league
	componentDidMount() {
		this.props.dispatch(fetchLeague(this.props.fantasyLeagueId));
	}
	
	// handleChange functions
	
	render() {
		if (this.props.players) {
			return(
				<div>
					{console.log('roster.js players:', this.props.players)}
					<div>
						<h5>You must select 23 players, no more than 4 from any one club.</h5>
						{/*set up a table here that lists all players in DropDownMenued league. column headers can be used (as drop down menus) to limit to a certain position or team for easier readability and DropDownMenuion. column headers will be "fullName position clubName"*/}
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>
										<DropDownMenu
											value={"allPositions"}>
											<MenuItem key={"1"} value={"allPositions"} primaryText={"All Positions"}/>
											<MenuItem key={"2"} value={"f"} primaryText={"Forwards"}/>
											<MenuItem key={"3"} value={"m"} primaryText={"Midfielders"}/>
											<MenuItem key={"4"} value={"d"} primaryText={"Defenders"}/>
											<MenuItem key={"5"} value={"g"} primaryText={"Goalkeepers"}/>
										</DropDownMenu>
									</th>
									<th>
										<DropDownMenu
											value={"allClubs"}>
											<MenuItem key={"77"} value={"allClubs"} primaryText={"All Clubs"} />
											{LEAGUE_IDS_NAMES.forEach(league => {
												if (league.id === this.props.fantasyLeagueId) {
													league.clubs.map(club => {
														return <MenuItem key={Math.random()} value={club.name} primaryText={club.name} />;
													});
												}
											})}
										</DropDownMenu>
									</th>
								</tr>
							</thead>
							<tbody>
								
							</tbody>
						</table>
					</div>
					<div>
						Roster:
						{/* set up a table to list players chosen for this section */}
					</div>
				</div>
			);
		} else {
			return(
				<div>
					<p>We are sorry, but something went wrong.  Please try again later.</p>
				</div>
			);
		}
	}
}

const mapRosterStateToProps = state => ({
  fantasyLeagueId: state.userReducer.fantasyLeagueId,
  players: state.leagueReducer.players
});

const Roster = connect(
	mapRosterStateToProps	
)(Team);

export default CSSModules(Roster, styles);