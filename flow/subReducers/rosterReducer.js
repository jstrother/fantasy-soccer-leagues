import { GET_ROSTER_SUCCESS, GET_ROSTER_FAIL, SET_GOALKEEPER_SUCCESS, SET_GOALKEEPER_FAIL, SET_DEFENDER_SUCCESS, SET_DEFENDER_FAIL, SET_MIDFIELDER_SUCCESS, SET_MIDFIELDER_FAIL, SET_FORWARD_SUCCESS, SET_FORWARD_FAIL, REMOVE_GOALKEEPER_SUCCESS, REMOVE_GOALKEEPER_FAIL, REMOVE_DEFENDER_SUCCESS, REMOVE_DEFENDER_FAIL, REMOVE_MIDFIELDER_SUCCESS, REMOVE_MIDFIELDER_FAIL, REMOVE_FORWARD_SUCCESS, REMOVE_FORWARD_FAIL, ADD_STARTER_SUCCESS, ADD_STARTER_FAIL, ADD_BENCHWARMER_SUCCESS, ADD_BENCHWARMER_FAIL, REMOVE_STARTER_SUCCESS, REMOVE_STARTER_FAIL, REMOVE_BENCHWARMER_SUCCESS, REMOVE_BENCHWARMER_FAIL } from '../subActions/rosterActions.js';

const initialState = {
  goalkeepers: [], 
  defenders: [], 
  midfielders: [], 
  forwards: [], 
  starters: [], 
  benchwarmers: []
};

export const rosterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROSTER_SUCCESS:
      return Object.assign({}, state,
        {
          goalkeepers: action.roster.goalkeepers,
          defenders: action.roster.defenders,
          midfielders: action.roster.midfielders,
          forwards: action.roster.forwards,
          starters: action.roster.starters,
          benchwarmers: action.roster.benchwarmers
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
    case ADD_STARTER_SUCCESS:
      return Object.assign({}, state,
        {
          starters: action.starter
        }
      );
    case REMOVE_STARTER_SUCCESS:
      return Object.assign({}, state,
        {
          starters: action.starter
        }
      );
    case ADD_BENCHWARMER_SUCCESS:
      return Object.assign({}, state,
        {
          benchwarmers: action.benchwarmer
        }
      );
    case REMOVE_BENCHWARMER_SUCCESS:
      return Object.assign({}, state,
        {
          benchwarmers: action.benchwarmer
        }
      );
    case GET_ROSTER_FAIL:
    case SET_GOALKEEPER_FAIL:
    case REMOVE_GOALKEEPER_FAIL:
    case SET_DEFENDER_FAIL:
    case REMOVE_DEFENDER_FAIL:
    case SET_MIDFIELDER_FAIL:
    case REMOVE_MIDFIELDER_FAIL:
    case SET_FORWARD_FAIL:
    case REMOVE_FORWARD_FAIL:
    case ADD_STARTER_FAIL:
    case REMOVE_STARTER_FAIL:
    case ADD_BENCHWARMER_FAIL:
    case REMOVE_BENCHWARMER_FAIL:
    default:
      return state;
  }
};