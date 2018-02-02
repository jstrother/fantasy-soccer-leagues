// ./flow/subReducers/fantasyClubReducer.js
// imported into ./flow/reducers.js

import { SET_MANAGER_SUCCESS, SET_MANAGER_FAIL, SET_ROSTER_SUCCESS, SET_ROSTER_FAIL, SET_CLUB_NAME_SUCCESS, SET_CLUB_NAME_FAIL, GET_CLUB_SUCCESS, GET_CLUB_FAIL } from '../subActions/fantasyClubActions.js';

export const fantasyClubReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CLUB_SUCCESS:
      return Object.assign({}, state,
        {
          manager: action.fantasyClub.manager,
          clubName: action.fantasyClub.clubName,
          roster: action.fantasyClub.roster,
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
    case SET_ROSTER_SUCCESS:
      return Object.assign({}, state,
        {
          roster: action.roster
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
    case SET_ROSTER_FAIL:
    default:
      return state;
  }
};