// ./flow/subReducers/fantasyClubReducer.js
// imported into ./flow/reducers.js

import { NEW_CLUB_SUCCESS, NEW_CLUB_FAIL, GET_CLUB_SUCCESS, GET_CLUB_FAIL } from '../subActions/fantasyClubActions.js';

export const fantasyClubReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CLUB_SUCCESS:
      return Object.assign({}, state,
        {
          manager: action.fantasyClub.manager,
          clubName: action.fantasyClub.clubName,
          points: action.fantasyClub.points,
          goalkeepers: action.fantasyClub.goalkeepers,
          defenders: action.fantasyClub.defenders,
          midfielders: action.fantasyClub.midfielders,
          forwards: action.fantasyClub.forwards,
          starters: action.fantasyClub.starters,
          benchwarmers: action.fantasyClub.benchwarmers,
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
          clubName: action.clubName,
          manager: action.manager
        }
      );
    case GET_CLUB_FAIL:
    case NEW_CLUB_FAIL:
    default:
      return state;
  }
};