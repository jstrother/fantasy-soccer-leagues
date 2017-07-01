// components/signUpDialog.js

import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class SignUpDialog extends React.Component {
  constructor(props){
		super(props);
		if (!this.props.user.name) {
			this.state = {
		    open: true,
		  };
		}
		else {
			this.state = {
		    open: false,
		  };
		}
	}

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];
    
    return(
      <Dialog
        title="New User Setup"
        actions={actions}
        modal={true}
        open={this.state.open}
      >
        To finish setup, please fill out the following fields:
        <TextField
        	name="userName"
        	onChange={null}
        	floatingLabelText="Please enter your name."
        	errorText="This field is required."
        	className="newUserNameField" /> {/*the onChange function is to input the text input into the db associated with the google ID*/}
        <TextField
        	name="clubName"
        	onChange={null}
        	floatingLabelText="Please enter your club name."
        	errorText="This field is required."
        	className="newClubNameField" /> {/*the onChange function is to input the text input into the db associated with the google ID*/}
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: true
  };
};

export default connect(mapStateToProps)(SignUpDialog);