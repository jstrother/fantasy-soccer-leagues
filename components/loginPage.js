import React from 'react';

export class LoginPage extends React.Component {
  render() {
    return <a href={'/user/auth/google'} className='login-button' >Log In</a>;
  }
}