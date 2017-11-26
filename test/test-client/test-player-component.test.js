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
    const wrapper = mount(<Player name={'Peter Jones'} />),
      nameEl = wrapper.children().children().first();
    console.log(nameEl.debug());
    expect(nameEl.text()).toEqual('Name: Peter Jones');
  });
});