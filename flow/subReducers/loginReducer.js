// ./flow/subReducers/loginReducer.js
// imported into ./flow/reducers.js

export const loginReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOG_IN':
      return [
        ...state,
        {
          googleId: action.googleId,
          accessToken: action.accessToken
        }
      ];
    default:
      return state;
  }
};