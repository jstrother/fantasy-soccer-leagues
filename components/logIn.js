// ./login.js imported into app.js

import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class LogIn extends React.Component {
  render() {
    return (
      <div>
        <div>Log in to your team</div>
        <TextField
          className='log-in-username'
          hintText='User Name' />
        <br />
        <TextField
          className='log-in-password'
          hintText='Password' />
        <br />
        <FlatButton
          className='log-in-submit'
          label='Submit' />
      </div>
    );
  }
}
//uses login action