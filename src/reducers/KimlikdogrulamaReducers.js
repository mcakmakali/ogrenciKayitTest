import { EMAIL_CHANGE, PASSWORD_CHANGE } from '../actions/types';
const INITAL_STATE = { 
  email : '',
  password : ''
}

export  default (state = INITAL_STATE, actions) => {
    switch (actions.type) {
      case EMAIL_CHANGE:
          return { ...state, email: action.payload };
      case PASSWORD_CHANGE:
          return { ...state, password: action.payload };

      default:
          return state;
    }
}
