/**
 * Created by Yang on 2/2/17.
 */
import { UPDATE_ACCOUNT_AVATAR } from './constants';
import { USERLOGIN, USERLOGOUT } from '../../containers/App/constants';

function updateAccountAvatar(response) {
  return {
    type: UPDATE_ACCOUNT_AVATAR,
    data: response,
  };
}

function userLogin() {
  return {
    type: USERLOGIN,
  };
}

function userLogout() {
  return {
    type: USERLOGOUT,
  };
}

export { updateAccountAvatar, userLogin, userLogout };
