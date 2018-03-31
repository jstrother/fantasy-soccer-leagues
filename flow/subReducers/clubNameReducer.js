import { SET_CLUB_NAME_SUCCESS, SET_CLUB_NAME_FAIL } from '../subActions/clubNameActions.js';

const initialState = {
  clubName: ''
};

export const clubNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLUB_NAME_SUCCESS:
      return Object.assign({}, state,
        {
          clubName: action.clubName
        }
      );
    case SET_CLUB_NAME_FAIL:
    default:
      return state;
  }
};