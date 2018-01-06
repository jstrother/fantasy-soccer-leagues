// components/home.js
// imported into app.js

import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import CSSModules from 'react-css-modules';
import { LoginPage } from './loginPage.js';
import { fetchUser } from '../flow/subActions/userActions.js';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import styles from '../scss/header.scss';

export class Header extends React.Component {
  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      this.props.dispatch(fetchUser(accessToken));
    }
  }
  
  render() {
    if (!this.props.displayName) {
      return (
        <div
          className={styles.toolbar}>
      			<h2
      			  className={styles.title}>
      			  The Fantasy Soccer-Football Super League
      			 </h2>
      			<section 
    			    className={styles.login}>
      			  <LoginPage />
      			</section>
      	</div>
      );
    }
    
    if (this.props.displayName && !this.props.fantasyLeagueName) {
      return (
        <div
          className={styles.toolbar}>
      			<h2
      			  className={styles.title}>
      			  The Fantasy Soccer-Football Super League
      			 </h2>
      			<p 
    			    className={styles.userName}>
      			  {this.props.displayName}
      			</p>
    			  <img 
    			    className={styles.userPhoto}
    			    src={this.props.userPhoto} 
    			    alt={`${this.props.displayName} picture`}/>
      	</div>
      );
    }
    
    if (this.props.displayName && this.props.fantasyLeagueName) {
      return (
        <div
          className={styles.toolbar}>
      			<h2
      			  className={styles.title}>
      			  The Fantasy Soccer-Football Super League
      			 </h2>
      			<p 
    			    className={styles.userName}>
      			  {this.props.displayName}
      			</p>
    			  <img 
    			    className={styles.userPhoto}
    			    src={this.props.userPhoto} 
    			    alt={`${this.props.displayName} picture`}/>
    			   <p 
    			    className={styles.leagueName}>
      			    {`Based upon: ${this.props.fantasyLeagueName}`}
      			 </p>
      	</div>
      );
    }
  }  
}

const mapHeaderStateToProps = state => (
  {
    displayName: state.loginReducer.displayName,
    userPhoto: state.loginReducer.userPhoto,
    fantasyLeagueName: state.loginReducer.fantasyLeagueName
  }
);

const CustomizedHeader = connect(
  mapHeaderStateToProps  
)(Header);

export default CSSModules(CustomizedHeader, styles);