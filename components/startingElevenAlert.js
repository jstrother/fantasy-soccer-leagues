/*eslint-disable no-console, no-unused-vars*/
// components/startingElevenAlert.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from '../scss/startingElevenAlert.scss';

export class StarterAlert extends React.Component {
  render() {
    return (
      <div
        className={this.props.show === false ? styles.hidden : styles.startingElevenAlert}>
        <p>
          {this.props.message}
        </p>
      </div>
    );
  }
}

const mapStarterAlertStateToProps = state => ({
  message: state.startingElevenAlertReducer.message,
  show: state.startingElevenAlertReducer.show
});

const StartingElevenAlert = connect(
  mapStarterAlertStateToProps
)(StarterAlert);

export default CSSModules(StartingElevenAlert, styles);