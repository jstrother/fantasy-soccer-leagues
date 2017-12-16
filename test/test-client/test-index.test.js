import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { LEAGUE_IDS_NAMES } from '../../server/league_ids_names.js';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

import FantasyClub from '../../components/fantasyClub.js';
import FantasyLeague from '../../components/fantasyLeague.js';
import { LoginPage } from '../../components/loginPage.js';
import LogIn from '../../components/home.js';

configure({ adapter: new Adapter() });

const middlewares = [thunk],
  mockStore = configureStore(middlewares),
  { testCurrentUser } = require('../common.js'),
  testNock = nock('https://fantasy-soccer-leagues-jstrother.c9users.io')
    .get('/')
    .reply(200, testCurrentUser);

function success() {
  return {
    type: 'SET_USER_SUCCESS'
  };
}

function fetchData () {
  return dispatch => {
    return fetch('https://fantasy-soccer-leagues-jstrother.c9users.io')
      .then(() => dispatch(success()));
  };
}

test('building the LogIn component', () => {
  const store = mockStore({});
  let storeFetch = store.dispatch(fetchData());
    return storeFetch.then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(success());
    });
});