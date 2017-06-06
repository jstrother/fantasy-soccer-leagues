// ./signUp.js imported into app.js

import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class SignUp extends React.Component {
  render() {
    return(
      <div>
        <div>Sign up to play!</div>
        <TextField
          hintText='Enter Your Name' />
        <br />
        <TextField
          hintText='Enter Your Email' />
        <br />
        <TextField 
          hintText='Create User Name' />
        <br />
        <TextField
          hintText='Enter Password' />
        <br />
        <TextField
          hintText='Confirm Password' />
        <br />
        <TextField
          hintText='Enter Team Name' />
        <br />
        <FlatButton
          label='Submit' />
      </div>
    );
  }
}
// uses signUp action