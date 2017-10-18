import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';
import thunk from 'redux-thunk';

import FantasyClub from '../components/fantasyClub.js';
import FantasyLeague from '../components/fantasyLeague.js';
import LoginPage from '../components/loginPage.js';
import LogIn from '../components/home.js';
// import testCurrentUser from './currentUser.json'; // this line needs to be brought in properly, not as an import


configure({ adapter: new Adapter() });

const mockStore = configureStore(),
  middlewares = [thunk];

let store;

function success() {
  return {
    type: 'SET_USER_SUCCESS'
  }
}

function fetchData () {
  return dispatch => {
    return fetch(testCurrentUser)
      .then(() => dispatch(success()))
  };
}

function setup() {
  const initialState = {
    loginReducer: {
      testCurrentUser
    }
  };
  
  let store = mockStore(initialState);
  
  const enzymeWrapper = mount( <Provider store={store}><LogIn /></Provider> );
  
  return {enzymeWrapper, store};
}

test('building the LogIn component', () => {
  const enzymeWrapper = setup();
  expect(enzymeWrapper.find(LogIn).length).toEqual(1);
});