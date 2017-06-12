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
          className='sign-up-name'
          hintText='Enter Your Name' />
        <br />
        <TextField
          className='sign-up-email'
          hintText='Enter Your Email' />
        <br />
        <TextField
          className='sign-up-username'
          hintText='Create User Name' />
        <br />
        <TextField
          className='sign-up-password'
          type='password'
          hintText='Enter Password' />
        <br />
        <TextField
          className='sign-up-confirm'
          type='password'
          hintText='Confirm Password' />
        <br />
        <TextField
          className='sign-up-team'
          hintText='Enter Team Name' />
        <br />
        <FlatButton
          className='sign-up-submit'
          label='Submit' />
      </div>
    );
  }
}
// uses signUp action