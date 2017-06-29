// ./flow/subReducers/loginReducer.js
// imported into ./flow/reducers.js

let initialState = [];
export const loginReducer = (state, action) => {
  state = state || initialState;
  if (action.type === 'LOG_IN') {
    return state.user;
  }
};

/*

LOG_IN action:
  googleId,
  accessToken

*/