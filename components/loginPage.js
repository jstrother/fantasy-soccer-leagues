import React from 'react';
import CSSModules from 'react-css-modules';

import styles from '../scss/loginPage.scss';

export class LoginPage extends React.Component {
  render() {
    return <a href={'/user/auth/google'} className={styles.link} >Log In</a>;
  }
}

export default CSSModules(LoginPage, styles);