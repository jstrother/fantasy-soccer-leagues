// components/home.js
// imported into app.js

import React from 'react';

import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

export default class Header extends React.Component {
  constructor(props) {
		super(props);
		this.state={
			value: 1
		};
	}
	
  render() {
    return (
      <Toolbar>
    		<ToolbarGroup>
    			<ToolbarTitle text="The Fantasy Soccer-Football Super League" />
    		</ToolbarGroup>
    	</Toolbar>
    );
  }  
}