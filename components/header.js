/* eslint-disable no-unused-vars, no-console*/
// components/header.js
// imported into app.js

import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import CSSModules from 'react-css-modules';
import { LoginPage } from './loginPage.js';
import { fetchUser } from '../flow/subActions/userActions.js';

import styles from '../scss/header.scss';

export class Header extends React.Component {
  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      console.log('accessToken:', accessToken);
      this.props.dispatch(fetchUser(accessToken));
    }
  }
  
  render() {
    if (!this.props.displayName) {
      return (
        <header
          className={styles.toolbar}>
          <h2
            className={styles.title}>
            The Fantasy Soccer-Football Super League
          </h2>
          <section 
            className={styles.userSection}>
            <LoginPage />
          </section>
        </header>
      );
    }
    
    if (this.props.displayName) {
      return (
        <header
          className={styles.toolbar}>
          <h2
            className={styles.title}>
            The Fantasy Soccer-Football Super League
          </h2>
          <section
            className={styles.userSection}>
            <h3
              className={styles.clubName}>
              {this.props.clubName}
            </h3>
            <p 
              className={styles.userName}>
              {this.props.displayName}
            </p>
            <img 
              className={styles.userPhoto}
              src={this.props.userPhoto} 
              alt={`${this.props.displayName}'s picture`}/>
            <p>
              <a href={'/user/auth/logout'} className={styles.link}>Log Out</a>
            </p>
          </section>
        </header>
      );
    }
  }  
}

const mapHeaderStateToProps = state => (
  {
    displayName: state.userReducer.displayName,
    userPhoto: state.userReducer.userPhoto,
    clubName: state.fantasyClubReducer.clubName
  }
);

const CustomizedHeader = connect(
  mapHeaderStateToProps  
)(Header);

export default CSSModules(CustomizedHeader, styles);