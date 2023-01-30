import { USERLOGIN, USERLOGOUT } from 'containers/App/constants';
import { userLogin, userLogout } from '../actions';

describe('test action', () => {
  it('user login', () => {
    expect(userLogin()).toEqual({
      type: USERLOGIN,
    });
  });
  it('userLogout', () => {
    expect(userLogout()).toEqual({
      type: USERLOGOUT,
    });
  });
});
