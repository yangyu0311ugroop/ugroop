/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import {
  USERLOGIN,
  USERLOGOUT,
  REFRESH_TOKEN_EXPIRY,
  RESET_GLOBAL_ERROR,
} from './constants';
// The initial state of the App
export const initialState = {
  loading: false,
  error: '',
  userAction: '', // To track Login, Logout, '' action so I can flush the data from local storage.
  showErrorDialog: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USERLOGIN:
        draft.userAction = USERLOGIN;
        break;
      case USERLOGOUT:
        draft.userAction = USERLOGOUT;
        break;
      case REFRESH_TOKEN_EXPIRY:
        draft.showErrorDialog = true;
        draft.error = action.value;
        break;
      case RESET_GLOBAL_ERROR:
        draft.showErrorDialog = false;
        draft.error = '';
        break;
    }
  });

export default appReducer;
