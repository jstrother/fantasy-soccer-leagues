import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Player from '../../components/player.js';
import expect from 'expect';

configure({ adapter: new Adapter() });

describe('Player Component', () => {
  it('renders without crashing', () => {
    console.log(Player);
    const wrapper = shallow(<Player />);
    
    expect(wrapper).toHaveLength(1);
    expect(Player).toBeDefined();
  });
  
  it('displays a name from name prop', () => {
    const wrapper = shallow(<Player name={'Peter Jones'} />),
      nameDiv = wrapper.children().children().first();
    console.log(nameDiv.debug());
    expect(nameDiv.text()).toEqual('Name: Peter Jones');
  });
});