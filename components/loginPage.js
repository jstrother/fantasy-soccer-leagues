import React from 'react';
import {connect} from 'react-redux';

class LoginPage extends React.Component {
  render() {
    return <a href={'/auth/google'} className='login-button' >Log In</a>;
  }
}

const mapStateToProps = (state)  => ({

});

export default connect(mapStateToProps)(LoginPage);