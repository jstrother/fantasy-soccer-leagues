import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Home from '../../components/home.js';
import { addLeague } from '../../flow/subActions/userActions.js';

configure({ adapter: new Adapter() });

const middlewares = [],
  mockStore = configureMockStore(middlewares);

function setup() {
  const props = {
    dispatch: jest.fn()
  }

  const enzymeWrapper = mount(<Home {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Home Component', () => {
  it('sends a request to select the league from home component', () => {
    const { enzymeWrapper, props } = setup(),
      store = mockStore();
    
    enzymeWrapper.find('DropDownMenu').simulate('change', { target: { value: 779 } });
    expect(props.dispatch.mock.calls.length).toBe(1);
  });
});