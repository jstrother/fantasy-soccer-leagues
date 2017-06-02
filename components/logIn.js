// ./login.js imported into app.js

import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class LogIn extends React.Component {
  render() {
    return (
      <div>
        <TextField
          hintText='User Name' />
        <TextField
          hintText='Password' />
        <FlatButton
          label='Submit' />
      </div>
    );
  }
}