import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Home } from '../../components/home.js';
import { LoginPage } from '../../components/loginPage.js';
import { addLeague } from '../../flow/subActions/userActions.js';
import expect from 'expect';

configure({ adapter: new Adapter() });

const middlewares = [],
  mockStore = configureMockStore(middlewares),
  testCurrentUser = {
    accessToken: 1974,
    displayName: 'Clint Dempsey',
    givenName: 'Clint',
    familyName: 'Dempsey',
    userPhoto: 'http://ww2.hdnux.com/photos/61/57/52/13040273/3/rawImage.jpg',
    googleId: 2
  },
  fantasyLeagueId = 779,
  fantasyLeagueName = 'Major League Soccer (USA)';

function setup() {
  const props = {
    dispatch: jest.fn(),
    accessToken: testCurrentUser.accessToken,
    displayName: testCurrentUser.displayName,
    givenName: testCurrentUser.givenName,
    userPhoto: testCurrentUser.userPhoto,
    googleId: testCurrentUser.googleId
  };

  const enzymeWrapper = shallow(<Home {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Home Component', () => {
  it('sends a request to select the league from home component', () => {
    const { enzymeWrapper, props } = setup();
    
    enzymeWrapper.find('.league-selection').simulate('change', { target: { value: fantasyLeagueId } });
    expect(props.dispatch.mock.calls.length).toBe(2);
    expect(typeof props.dispatch.mock.calls[0][0]).toBe('function');
  });
});