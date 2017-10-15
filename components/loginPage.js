import React from 'react';
import {connect} from 'react-redux';

export class LoginPage extends React.Component {
  render() {
    return <a href={'/user/auth/google'} className='login-button' >Log In</a>;
  }
}

const mapStateToProps = (state)  => ({

});

export default connect(mapStateToProps)(LoginPage);