/*eslint-disable no-console, no-unused-vars*/
// components/warning.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import styles from '../scss/warning.scss';

export class Alert extends React.Component {
  
  render() {
    return (
      <div
        className={this.props.show === false ? styles.hidden : styles.rosterWarning}>
        <p>
          {this.props.message}
        </p>
      </div>
    );
  }
}

const mapAlertStateToProps = state => ({
  message: state.warningReducer.message,
  show: state.warningReducer.show
});

const Warning = connect(
  mapAlertStateToProps
)(Alert);

export default CSSModules(Warning, styles);