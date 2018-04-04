// ./flow/subReducers/fantasyClubReducer.js
// imported into ./flow/reducers.js

import { NEW_CLUB_SUCCESS, NEW_CLUB_FAIL, GET_CLUB_SUCCESS, GET_CLUB_FAIL } from '../subActions/fantasyClubActions.js';

export const fantasyClubReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CLUB_SUCCESS:
      return Object.assign({}, state,
        {
          userId: action.fantasyClub.userId,
          manager: action.fantasyClub.manager,
          points: action.fantasyClub.points,
          wins: action.fantasyClub.wins,
          draws: action.fantasyClub.draws,
          losses: action.fantasyClub.losses,
          goalsFor: action.fantasyClub.goalsFor,
          goalsAgainst: action.fantasyClub.goalsAgainst,
          goalDifferential: action.fantasyClub.goalDifferential
        }
      );
    case NEW_CLUB_SUCCESS:
      return Object.assign({}, state,
        {
          manager: action.manager
        }
      );
    case GET_CLUB_FAIL:
    case NEW_CLUB_FAIL:
    default:
      return state;
  }
};