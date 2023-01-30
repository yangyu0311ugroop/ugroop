/**
 * Created by Yang on 2/2/17.
 */
import { fromJS } from 'immutable';
import { USERLOGOUT } from 'containers/App/constants';
import { UPDATE_ACCOUNT_AVATAR } from './constants';
// The initial state of the App
const initialState = fromJS({
  account: null,
  avatar: null,
});

function stormPathDataStoreReducer(state = initialState, action) {
  switch (action.type) {
    case USERLOGOUT: // TODO : CLEAN STORE PATH
      return state.set('account', null).set('avatar', null);
    case UPDATE_ACCOUNT_AVATAR:
      return state.set('avatar', action.data);
    default:
      return state;
  }
}

export default stormPathDataStoreReducer;
