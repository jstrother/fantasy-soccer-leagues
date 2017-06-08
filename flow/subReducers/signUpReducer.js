// ./flow/subReducers/signUpReducer.js
// imported into ./flow/reducers.js

import createData from '../../programFunctions/crud_functions.js';
import User from '../../models/user_model.js';

export const signUpReducer = (state = [], action) => {
  if (action.type === 'SIGN_UP') {
    return state = createData({
      name: action.name,
      userName: action.userName,
      userPassword: action.userPassword,
      userEmail: action.email,
      fantasyClub: action.teamName
    }, User);
  }
};