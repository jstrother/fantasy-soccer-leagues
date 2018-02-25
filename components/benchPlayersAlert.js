/*eslint-disable no-console, no-unused-vars*/
// components/startingElevenAlert.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from '../scss/benchPlayersAlert.scss';

export class BenchAlert extends React.Component {
  render() {
    return (
      <div
        className={this.props.show === false ? styles.hidden : styles.benchPlayersAlert}>
        <p>
          {this.props.message}
        </p>
      </div>
    );
  }
}

const mapBenchAlertStateToProps = state => ({
  message: state.benchPlayersAlertReducer.message,
  show: state.benchPlayersAlertReducer.show
});

const BenchPlayersAlert = connect(
  mapBenchAlertStateToProps
)(BenchAlert);

export default CSSModules(BenchPlayersAlert, styles);