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
      nameEl = wrapper.find('.player-name');
      
    expect(nameEl.text()).toEqual('Peter Jones');
  });
  
  it('displays a position from position prop', () => {
    const wrapper = mount(<Player position={'Forward'}/>),
      positionEl = wrapper.find('.player-position');
    
    expect(positionEl.text()).toEqual('Forward');
  });
  
  it('displays a club from club prop', () => {
    const wrapper = mount(<Player club={'FC Augsburg'}/>),
      clubEl = wrapper.find('.player-club');
    
    expect(clubEl.text()).toEqual('FC Augsburg');
  });
  
  it('displays a league from league prop', () => {
    const wrapper = mount(<Player league={'Bundesliga'}/>),
      leagueEl = wrapper.find('.player-league');
    
    expect(leagueEl.text()).toEqual('Bundesliga');
  });
  
  it('displays points from points prop', () => {
    const wrapper = mount(<Player fantasyPoints={14}/>),
      pointsEl = wrapper.find('.player-points');
    
    expect(pointsEl.text()).toEqual('Total Fantasy Points: ' + 14);
  });
});