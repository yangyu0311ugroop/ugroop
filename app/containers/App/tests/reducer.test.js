import appReducer from '../reducer';
import {
  USERLOGOUT,
  REFRESH_TOKEN_EXPIRY,
  RESET_GLOBAL_ERROR,
  USERLOGIN,
} from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: '',
      userAction: '',
      showErrorDialog: false,
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should set userAction when login', () => {
    state.userAction = USERLOGIN;
    const action = {
      type: USERLOGIN,
    };
    expect(appReducer(undefined, action)).toEqual(state);
  });
  it('should set userAction when logout', () => {
    state.userAction = USERLOGOUT;
    const action = {
      type: USERLOGOUT,
    };
    expect(appReducer(undefined, action)).toEqual(state);
  });
  it('should set correctly REFRESH_TOKEN_EXPIRY', () => {
    const error = 'error msg';
    state.showErrorDialog = true;
    state.error = error;
    const action = {
      type: REFRESH_TOKEN_EXPIRY,
      value: error,
    };
    expect(appReducer(undefined, action)).toEqual(state);
  });
  it('should set correctly RESET_GLOBAL_ERROR', () => {
    state.showErrorDialog = false;
    state.error = '';
    const action = {
      type: RESET_GLOBAL_ERROR,
    };
    expect(appReducer(undefined, action)).toEqual(state);
  });
});
