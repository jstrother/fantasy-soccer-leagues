// components/home.js
// imported into app.js

import React from 'react';
import { connect } from 'react-redux';

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

export class Header extends React.Component {
  
  render() {
    return (
      <Toolbar>
    		<ToolbarGroup className='toolbar-header'>
    			<ToolbarTitle className='toolbar-title-header' text="The Fantasy Soccer-Football Super League" />
    			<div className='user-div-header'>
    			  <p>{this.props.displayName}</p>
    			  <img src={this.props.userPhoto} alt={`${this.props.displayName} picture`}/>
    			  <p>{this.props.fantasyLeagueName}</p>
    			</div>
    		</ToolbarGroup>
    	</Toolbar>
    );
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