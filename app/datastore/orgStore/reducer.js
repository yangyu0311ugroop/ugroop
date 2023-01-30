/**
 * Created by Yang on 31/1/17.
 */
import { fromJS } from 'immutable';
import { PUT_ORG_SUCCESS } from './constants';
// The initial state of the App
const initialState = fromJS({
  org: null,
});

function orgReducer(state = initialState, action) {
  switch (action.type) {
    case PUT_ORG_SUCCESS:
      return state.set('org', action.data);
    default:
      return state;
  }
}

export default orgReducer;
