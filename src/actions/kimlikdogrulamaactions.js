import { EMAIL_CHANGE, PASSWORD_CHANGE } from './types';
export const emailChanged = (email) => {

  return (dispatch) => {
    dispatc({
      type : EMAIL_CHANGE,
      payload : email
    });
  };
};

export const passwordChanged = (password) => {
  return (dispatch) => {
    dispatc({
      type : PASSWORD_CHANGE,
      payload : password
    });
  };
};
