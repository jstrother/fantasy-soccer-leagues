/*eslint-disable no-unused-vars, no-console*/
// components/scheduleDisplay.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasyMatch from './fantasyMatch.js';
import { getSchedule, matchResolve } from '../flow/subActions/fantasyScheduleActions.js';
import { getClub } from '../flow/subActions/fantasyClubActions.js';
import styles from '../scss/scheduleDisplay.scss';

export class DisplaySchedule extends React.Component {
  componentDidMount() {
    this.props.dispatch(getSchedule(this.props.leagueScheduleId));
    this.props.dispatch(matchResolve());
  }
  componentDidUpdate() {
    console.log('this.props.scheduleFetched:', this.props.scheduleFetched);
    console.log('this.props.leagueScheduleId:', this.props.leagueScheduleId);
    if (!this.props.leagueScheduleId) {
      this.props.dispatch(getClub(this.props.userId));
    }
    if (this.props.leagueScheduleId && this.props.scheduleFetched === false) {
      this.props.dispatch(getSchedule(this.props.leagueScheduleId));
      this.props.dispatch(matchResolve());
    }
  }
  
  render() {
    return(
      <div>
        <p>Previous Match:</p>
        <FantasyMatch />
        <br />
        <p>Next Match:</p>
        <FantasyMatch />
        <br />
        <p>Schedule:</p>
        {/*insert table here for full schedule*/}
      </div>
    );
  }
}

const mapDisplayStateToProps = state => ({
  userId: state.userReducer.userId,
  fantasySchedule: state.fantasyScheduleReducer.fantasySchedule,
	leagueScheduleId: state.fantasyClubReducer.leagueScheduleId,
	scheduleFetched: state.fantasyScheduleReducer.scheduleFetched
});

const ScheduleDisplay = connect(
  mapDisplayStateToProps
)(DisplaySchedule);

export default CSSModules(ScheduleDisplay, styles);