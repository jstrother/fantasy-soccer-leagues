// components/index.js
// top-level react component

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Home from './home.js';
import LogIn from './logIn.js';
import store from '../flow/store.js';

// FantasyListener(store);
injectTapEventPlugin();

// the issue lies in Routes (which is setup just like the example from documentation)
class Routes extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			value: 1
		};
	}
	
	handleClick = (event, index, value) => {
		this.setState = ({
			value
		});
	}
	// trying to get the Links to be part of dropdown in a header(toolbar)
	// so far, no luck getting clicked Link to affect displayed Route
	render() {
		return(
			<Router>
		    <div>
		    	<Toolbar>
		    		<ToolbarGroup firstChild={true}>
		    			<ToolbarTitle text="The Fantasy Soccer-Football Super League" />
		    		</ToolbarGroup>
		    		<ToolbarGroup lastChild={true}>
			    		<DropDownMenu value={this.state.value} onClick={this.handleClick}>
			    			<MenuItem
			    				value={1}
			    				primaryText='Home'>
			    				<Link to='/' />
			    			</MenuItem>
			    			<MenuItem
			    				value={2}
			    				primaryText='Log In'>
			    				<Link to="/login" />
			    			</MenuItem>
			    		</DropDownMenu>
			    	</ToolbarGroup>
		    	</Toolbar>
		    	<div>
		    		<br />
		    		<br />
				    <Switch>
				    	<Route exact path='/' component={Home} />
				    	<Route path='/login' component={LogIn} />
				    </Switch>
					</div>
				</div>
		  </Router>
		);
	}	
}

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<Routes />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
);