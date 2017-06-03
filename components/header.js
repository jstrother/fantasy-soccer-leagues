// components/home.js
// imported into app.js

import React from 'react';

import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class Header extends React.Component{
  constructor(props) {
		super(props);
		this.state={
			value: 1
		};
	}
	
  render() {
    return (
      <Toolbar>
    		<ToolbarGroup firstChild={true}>
    			<ToolbarTitle text="The Fantasy Soccer-Football Super League" />
    		</ToolbarGroup>
    		<ToolbarGroup lastChild={true}>
      		<DropDownMenu value={this.state.value} >
      			<MenuItem
      				containerElement={<Link to='/' />}
      				value={1}
      				primaryText='Home' />
      			<MenuItem
      				containerElement={<Link to='/login' />}
      				value={2}
      				primaryText='Log In' />
      			<MenuItem
      				containerElement={<Link to='/signup' />}
      				value={3}
      				primaryText='Sign Up' />
      		</DropDownMenu>
      	</ToolbarGroup>
    	</Toolbar>
    );
  }  
}