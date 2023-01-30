/**
 * Created by Yang on 2/2/17.
 */
import { fromJS } from 'immutable';

import stormpathReducer from '../reducer';
import { updateAccountAvatar, userLogout } from '../actions';

describe('stormPathReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      account: null,
      avatar: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(stormpathReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should update avatar', () => {
    const fixture = fromJS({ profilePhotoUrl: '1', profilePhotoData: 'yang' });
    const expectedResult = state.set('avatar', fixture);
    expect(stormpathReducer(state, updateAccountAvatar(fixture))).toEqual(
      expectedResult,
    );
  });
  it('logout', () => {
    const expectedResult = state.set('avatar', null).set('account', null);
    expect(stormpathReducer(state, userLogout())).toEqual(expectedResult);
  });
});
