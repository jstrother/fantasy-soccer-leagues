import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import { SELECT_LEAGUE } from '../flow/subActions/userActions.js';

const middlewares = [thunk],
  mockStore = configureMockStore(middlewares),
  accessToken = 'ya29.Gl3vBP_DwCPG10kREzfknjRrfnLpGconcOme8xAf0A3SAREnkP3IMg4S97B1KNn7n5TWyysdj4z3aD9yRPD9z72K0RCtl0OY5ujzij4zN2HR11HWHONXqzujpVQ_T8U';
  
describe('select league async action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  
  it('selects a league and sets the league id and name', () => {
    fetchMock.putOnce('/user', {
      body: {
          fantasyLeagueId: 779,
          fantasyLeagueName: 'Major League Soccer (USA)'
        },
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const selectLeague = (fantasyLeagueId, fantasyLeagueName) => ({
      type: SELECT_LEAGUE,
      fantasyLeagueId,
      fantasyLeagueName
    }),
    postFantasyLeague = (fantasyLeagueId, fantasyLeagueName) => {
      
    },
    expectedAction = [
      selectLeague
    ];
    
    
  });
});