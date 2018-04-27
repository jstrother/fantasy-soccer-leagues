/*eslint-disable no-unused-vars*/
// components/scheduleDisplay.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasyMatch from './fantasyMatch.js';
import { getSchedule } from '../flow/subActions/fantasyScheduleActions.js';
import styles from '../scss/scheduleDisplay.scss';

export class DisplaySchedule extends React.Component {
  componentDidMount() {
    this.props.dispatch(getSchedule());
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
  fantasySchedule: state.fantasyScheduleReducer.fantasySchedule
});

const ScheduleDisplay = connect(
  mapDisplayStateToProps
)(DisplaySchedule);

export default CSSModules(ScheduleDisplay, styles);