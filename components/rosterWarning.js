/*eslint-disable no-console, no-unused-vars*/
// components/rosterWarning.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import styles from '../scss/rosterWarning.scss';

export class Warning extends React.Component {
  
  render() {
    return (
      <div
        className={this.props.show === false ? styles.hidden : styles.rosterWarning}>
        <p>
          {this.props.warningMessage}
        </p>
      </div>
    );
  }
}

const mapWarningStateToProps = state => ({
  warningMessage: state.rosterWarningReducer.message,
  show: state.rosterWarningReducer.show
});

const RosterWarning = connect(
  mapWarningStateToProps
)(Warning);

export default CSSModules(RosterWarning, styles);