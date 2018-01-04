// components/home.js
// imported into app.js

import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import { LoginPage } from './loginPage.js';
import { fetchUser } from '../flow/subActions/userActions.js';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

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
        <Toolbar>
      		<ToolbarGroup 
      		  className="toolbar-header" 
      		  style={{
      		    display: "flex",
      		    flexDirection: "row"
      		  }}>
      			<ToolbarTitle 
      			  className="toolbar-title-header"
      			  text="The Fantasy Soccer-Football Super League" />
      			<section 
      			  className="login-section"
      			  style={{
      			    marginLeft: "85em"
      			  }}>
      			  <LoginPage />
      			</section>
      		</ToolbarGroup>
      	</Toolbar>
      );
    }
    
    if (this.props.displayName && !this.props.fantasyLeagueName) {
      return (
        <Toolbar>
      		<ToolbarGroup 
      		  className="toolbar-header"
      		  style={{
      		    display: 'flex'
      		  }}>
      			<ToolbarTitle 
      			  className="toolbar-title-header" 
      			  text="The Fantasy Soccer-Football Super League" />
      			<p 
    			    className="user-name-header"
    			    style={{
      			    order: 1,
      			    marginLeft: '81.75em',
      			    paddingRight: '0.55em'
      			  }}>
      			  {this.props.displayName}
      			</p>
    			  <img 
    			    src={this.props.userPhoto} 
    			    alt={`${this.props.displayName} picture`}
    			    style={{
    			      order: 2
    			    }}/>
      		</ToolbarGroup>
      	</Toolbar>
      );
    }
    
    if (this.props.displayName && this.props.fantasyLeagueName) {
      return (
        <Toolbar>
      		<ToolbarGroup 
      		  className="toolbar-header"
      		  style={{
      		    display: 'flex'
      		  }}>
      			<ToolbarTitle 
      			  className="toolbar-title-header" 
      			  text="The Fantasy Soccer-Football Super League" />
      			<p 
    			    className="user-name-header"
    			    style={{
      			    order: 1,
      			    marginLeft: '5em',
      			    paddingRight: '0.55em'
      			  }}>
      			  {this.props.displayName}
      			</p>
    			  <img 
    			    src={this.props.userPhoto} 
    			    alt={`${this.props.displayName} picture`}
    			    style={{
    			      order: 2
    			    }}/>
    			  <p 
    			    className="league-name-header"
    			    style={{
    			      order: 0,
    			      marginLeft: '60em'
    			    }}>
    			    {`Based upon: ${this.props.fantasyLeagueName}`}
    			 </p>
      		</ToolbarGroup>
      	</Toolbar>
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

export default CustomizedHeader;