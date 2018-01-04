import React from 'react';
import { connect } from 'react-redux';

export class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello, Coach {this.props.familyName}!
      </div>
    );
  }
}

const mapCoachStateToProps = state => (
  {
    familyName: state.loginReducer.familyName
  }
);

const HelloCoach = connect(mapCoachStateToProps)(Hello);

export default HelloCoach;