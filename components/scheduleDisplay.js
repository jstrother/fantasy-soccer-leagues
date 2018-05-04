/*eslint-disable no-unused-vars*/
// components/scheduleDisplay.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasyMatch from './fantasyMatch.js';
import { getSchedule, matchResolve } from '../flow/subActions/fantasyScheduleActions.js';
import styles from '../scss/scheduleDisplay.scss';

export class DisplaySchedule extends React.Component {
  componentDidUpdate() {
    if (this.props.leagueScheduleId && this.props.scheduleFetched === false) {
      this.props.dispatch(getSchedule(this.props.leagueScheduleId));
      this.props.dispatch(matchResolve());
    }
  }
  
  render() {
    return(
      <div>
        Schedule:
        {/*insert table here for schedule*/}
        <br />
        <p>Previous Match:</p>
        <FantasyMatch />
        <br />
        <p>Next Match:</p>
        <FantasyMatch />
      </div>
    );
  }
}

const mapDisplayStateToProps = state => ({
  fantasySchedule: state.fantasyScheduleReducer.fantasySchedule,
	leagueScheduleId: state.fantasyClubReducer.leagueScheduleId,
	scheduleFetched: state.fantasyScheduleReducer.scheduleFetched
});

const ScheduleDisplay = connect(
  mapDisplayStateToProps
)(DisplaySchedule);

export default CSSModules(ScheduleDisplay, styles);