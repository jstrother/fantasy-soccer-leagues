import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {Teammate} from '../../components/player.js';
import expect from 'expect';

configure({ adapter: new Adapter() });

describe('Teammate Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Teammate />);
    
    expect(wrapper).toHaveLength(1);
    expect(Teammate).toBeDefined();
  });
  
  it('displays a name from name props', () => {
    const wrapper = mount(<Teammate firstName={'Peter'} lastName={'Jones'}/>),
      nameEl = wrapper.find('.player-name');
      
    expect(nameEl.text()).toEqual('Peter Jones');
  });
  
  it('displays a position from position prop', () => {
    const wrapper = mount(<Teammate position={'Forward'}/>),
      positionEl = wrapper.find('.player-position');
    
    expect(positionEl.text()).toEqual('Forward');
  });
  
  it('displays a club from club prop', () => {
    const wrapper = mount(<Teammate club={'Seattle Sounders'}/>),
      clubEl = wrapper.find('.player-club');
    
    expect(clubEl.text()).toEqual('Seattle Sounders');
  });
  
  it('displays a league from league prop', () => {
    const wrapper = mount(<Teammate leagueId={779}/>),
      leagueEl = wrapper.find('.player-league');
    
    expect(leagueEl.text()).toEqual('Major League Soccer (USA)');
  });
  
  it('displays points from points prop', () => {
    const wrapper = mount(<Teammate fixturePoints={14} seasonPoints={36}/>),
      fixturePointsEl = wrapper.find('.fixture-points'),
      seasonPointsEl = wrapper.find('.season-points');
    
    expect(fixturePointsEl.first().text()).toEqual('Most Recent Match: 14');
    expect(seasonPointsEl.first().text()).toEqual('Season Total: 36');
  });
  
  it('displays shots from shots props', () => {
    const wrapper = mount(<Teammate shotsTotal={2} shotsOnGoal={0} />),
      shotsTotalEl = wrapper.find('.shots-total'),
      shotsOnGoalEl = wrapper.find('.shots-on-goal');
      
    expect(shotsTotalEl.first().text()).toEqual('Total: 2');
    expect(shotsOnGoalEl.first().text()).toEqual('On Goal: 0');
  });
  
  it('displays goals from goals props', () => {
    const wrapper = mount(<Teammate goalsScored={1} goalsConceded={0} ownGoals={0} />),
      goalsScoredEl = wrapper.find('.goals-scored'),
      goalsConcededEl = wrapper.find('.goals-conceded'),
      ownGoalsEl = wrapper.find('.own-goals');
    
    expect(goalsScoredEl.first().text()).toEqual('Scored: 1');
    expect(goalsConcededEl.first().text()).toEqual('Conceded: 0');
    expect(ownGoalsEl.first().text()).toEqual('Own Goals: 0');
  });
  
  it('displays fouls from fouls props', () => {
    const wrapper = mount(<Teammate foulsDrawn={5} foulsCommitted={4} />),
      foulsDrawnEl = wrapper.find('.fouls-drawn'),
      foulsCommittedEl = wrapper.find('.fouls-committed');
    
    expect(foulsDrawnEl.first().text()).toEqual('Drawn: 5');
    expect(foulsCommittedEl.first().text()).toEqual('Committed: 4');
  });
  
  it('displays cards from cards props', () => {
    const wrapper = mount(<Teammate yellowCards={1} redCards={0} />),
      yellowCardsEl = wrapper.find('.yellow-cards'),
      redCardsEl = wrapper.find('.red-cards');
      
    expect(yellowCardsEl.first().text()).toEqual('Yellow Cards: 1');
    expect(redCardsEl.first().text()).toEqual('Red Cards: 0');
  });
  
  it('displays passing stats from passing props', () => {
    const wrapper = mount(<Teammate totalCrosses={6} crossingAccuracy={75} totalPasses={26} passingAccuracy={85} />),
      totalCrossesEl = wrapper.find('.total-crosses'),
      crossingAccuracyEl = wrapper.find('.crossing-accuracy'),
      totalPassesEl = wrapper.find('.total-passes'),
      passingAccuracyEl = wrapper.find('.passing-accuracy');
    
    expect(totalCrossesEl.first().text()).toEqual('Total Crosses: 6');
    expect(crossingAccuracyEl.first().text()).toEqual('Crossing Accuracy: 75');
    expect(totalPassesEl.first().text()).toEqual('Total Passes: 26');
    expect(passingAccuracyEl.first().text()).toEqual('Passing Accuracy: 85');
  });
  
  it('displays penalties stas from penalties props', () => {
    const wrapper = mount(<Teammate penaltiesScored={0} penaltiesMissed={1} penaltiesSaved={0} />),
      penaltiesScoredEl = wrapper.find('.penalties-scored'),
      penaltiesMissedEl = wrapper.find('.penalties-missed'),
      penaltiesSavedEl = wrapper.find('.penalties-saved');
    
    expect(penaltiesScoredEl.first().text()).toEqual('Scored: 0');
    expect(penaltiesMissedEl.first().text()).toEqual('Missed: 1');
    expect(penaltiesSavedEl.first().text()).toEqual('Saved: 0');
  });
  
  it('displays additional stats from other props', () => {
    const wrapper = mount(<Teammate assists={2} offsides={3} saves={0} tackles={10} blocks={0} interceptions={8} clearances={4} minutesPlayed={90} />),
      assistsEl = wrapper.find('.assists'),
      offsidesEl = wrapper.find('.offsides'),
      savesEl = wrapper.find('.saves'),
      tacklesEl = wrapper.find('.tackles'),
      blocksEl = wrapper.find('.blocks'),
      interceptionsEl = wrapper.find('.interceptions'),
      clearancesEl = wrapper.find('.clearances'),
      minutesEl = wrapper.find('.minutes-played');
      
    expect(assistsEl.first().text()).toEqual('Assists: 2');
    expect(offsidesEl.first().text()).toEqual('Offsides: 3');
    expect(savesEl.first().text()).toEqual('Saves: 0');
    expect(tacklesEl.first().text()).toEqual('Tackles: 10');
    expect(blocksEl.first().text()).toEqual('Blocks: 0');
    expect(interceptionsEl.first().text()).toEqual('Interceptions: 8');
    expect(clearancesEl.first().text()).toEqual('Clearances: 4');
    expect(minutesEl.first().text()).toEqual('Minutes Played: 90');
  });
});