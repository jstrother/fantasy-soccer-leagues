// ./signUp.js imported into app.js

import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class SignUp extends React.Component {
  render() {
    return(
      <div>
        <TextField 
          hintText='Create User Name' />
        <TextField
          hintText='Enter Password' />
        <TextField
          hintText='Confirm Password' />
        <TextField
          hintText='Enter Team Name' />
        <FlatButton
          label='Submit' />
      </div>
    );
  }
}