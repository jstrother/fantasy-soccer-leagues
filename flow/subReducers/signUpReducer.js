// ./flow/subReducers/signUpReducer.js
// imported into ./flow/reducers.js

export const signUpReducer = (state = [], action) => {
  if (action.type === 'SIGN_UP') {
    return state;  // still trying to figure out what needs to go here to adjust state
  }
};