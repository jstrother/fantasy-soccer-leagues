// ./flow/subReducers/fantasyClubReducer.js
// imported into ./flow/reducers.js

import { SET_MANAGER_SUCCESS, SET_MANAGER_FAIL, SET_CLUB_NAME_SUCCESS, SET_CLUB_NAME_FAIL, GET_CLUB_SUCCESS, GET_CLUB_FAIL } from '../subActions/fantasyClubActions.js';

const initialState = {
  manager: null, 
  clubName: null, 
  userId: null, 
  points: null, 
  wins: null, 
  draws: null, 
  losses: null, 
  goalsFor: null, 
  goalsAgainst: null, 
  goalDifferential: null
};

export const fantasyClubReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLUB_SUCCESS:
      return Object.assign({}, state,
        {
          userId: action.fantasyClub.userId,
          manager: action.fantasyClub.manager,
          clubName: action.fantasyClub.clubName,
          points: action.fantasyClub.points,
          wins: action.fantasyClub.wins,
          draws: action.fantasyClub.draws,
          losses: action.fantasyClub.losses,
          goalsFor: action.fantasyClub.goalsFor,
          goalsAgainst: action.fantasyClub.goalsAgainst,
          goalDifferential: action.fantasyClub.goalDifferential
        }
      );
    case SET_MANAGER_SUCCESS:
      return Object.assign({}, state,
        {
          manager: action.manager,
          userId: action.userId
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
    default:
      return state;
  }
};