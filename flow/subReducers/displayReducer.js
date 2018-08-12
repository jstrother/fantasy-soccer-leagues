import {ROSTER_SHOW, ROSTER_HIDE, SCHEDULE_SHOW, SCHEDULE_HIDE, STANDINGS_SHOW, STANDINGS_HIDE} from '../subActions/displayActions.js';

const initialState = {
  rosterVisible: true,
  scheduleVisible: false,
  standingsVisible: false
};

export const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROSTER_SHOW:
      return Object.assign({}, state,
        {
          rosterVisible: true
        }
      );
    case ROSTER_HIDE:
      return Object.assign({}, state,
        {
          rosterVisible: false
        }
      );
    case SCHEDULE_SHOW:
      return Object.assign({}, state,
        {
          scheduleVisible: true
        }
      );
    case SCHEDULE_HIDE:
      return Object.assign({}, state,
        {
          scheduleVisible: false
        }
      );
    case STANDINGS_SHOW:
      return Object.assign({}, state,
        {
          standingsVisible: true
        }
      );
    case STANDINGS_HIDE:
      return Object.assign({}, state,
        {
          standingsVisible: false
        }
      );
    default:
      return state;
  }
};