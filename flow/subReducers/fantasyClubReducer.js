// ./flow/subReducers/fantasyClubReducer.js
// imported into ./flow/reducers.js

import { SET_MANAGER_SUCCESS, SET_MANAGER_FAIL, SET_GOALKEEPER_SUCCESS, SET_GOALKEEPER_FAIL, SET_DEFENDER_SUCCESS, SET_DEFENDER_FAIL, SET_MIDFIELDER_SUCCESS, SET_MIDFIELDER_FAIL, SET_FORWARD_SUCCESS, SET_FORWARD_FAIL, SET_CLUB_NAME_SUCCESS, SET_CLUB_NAME_FAIL, GET_CLUB_SUCCESS, GET_CLUB_FAIL, REMOVE_GOALKEEPER_SUCCESS, REMOVE_GOALKEEPER_FAIL, REMOVE_DEFENDER_SUCCESS, REMOVE_DEFENDER_FAIL, REMOVE_MIDFIELDER_SUCCESS, REMOVE_MIDFIELDER_FAIL, REMOVE_FORWARD_SUCCESS, REMOVE_FORWARD_FAIL } from '../subActions/fantasyClubActions.js';

export const fantasyClubReducer = (state = {goalkeepers: [], defenders: [], midfielders: [], forwards: []}, action) => {
  switch (action.type) {
    case GET_CLUB_SUCCESS:
      return Object.assign({}, state,
        {
          manager: action.fantasyClub.manager,
          clubName: action.fantasyClub.clubName,
          goalkeepers: action.fantasyClub.goalkeepers,
          defenders: action.fantasyClub.defenders,
          midfielders: action.fantasyClub.midfielders,
          forwards: action.fantasyClub.forwards,
          league: action.fantasyClub.league,
          division: action.fantasyClub.division,
          champsLeague: action.fantasyClub.champsLeague,
          schedule: action.fantasyClub.schedule
        }
      );
    case SET_MANAGER_SUCCESS:
      return Object.assign({}, state,
        {
          manager: action.manager
        }
      );
    case SET_GOALKEEPER_SUCCESS:
      return Object.assign({}, state,
        {
          goalkeepers: action.goalkeeper
        }
      );
    case REMOVE_GOALKEEPER_SUCCESS:
      return Object.assign({}, state,
        {
          goalkeepers: action.goalkeeper
        }
      );
    case SET_MIDFIELDER_SUCCESS:
      return Object.assign({}, state,
        {
          midfielders: action.midfielder
        }
      );
    case REMOVE_MIDFIELDER_SUCCESS:
      return Object.assign({}, state,
        {
          midfielders: action.midfielder
        }
      );
    case SET_DEFENDER_SUCCESS:
      return Object.assign({}, state,
        {
          defenders: action.defender
        }
      );
    case REMOVE_DEFENDER_SUCCESS:
      return Object.assign({}, state,
        {
          defenders: action.defender
        }
      );
    case SET_FORWARD_SUCCESS:
      return Object.assign({}, state,
        {
          forwards: action.forward
        }
      );
    case REMOVE_FORWARD_SUCCESS:
      return Object.assign({}, state,
        {
          forwards: action.forward
        }
      );
    case SET_CLUB_NAME_SUCCESS:
      return Object.assign({}, state,
        {
          clubName: action.clubName
        }
      );
    case GET_CLUB_FAIL:
    case SET_CLUB_NAME_FAIL:
    case SET_MANAGER_FAIL:
    case SET_GOALKEEPER_FAIL:
    case REMOVE_GOALKEEPER_FAIL:
    case SET_DEFENDER_FAIL:
    case REMOVE_DEFENDER_FAIL:
    case SET_MIDFIELDER_FAIL:
    case REMOVE_MIDFIELDER_FAIL:
    case SET_FORWARD_FAIL:
    case REMOVE_FORWARD_FAIL:
    default:
      return state;
  }
};