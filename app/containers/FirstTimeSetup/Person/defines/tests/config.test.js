import { USERLOGOUT } from 'containers/App/constants';
import { fromJS } from 'immutable';
/**
 * Created by Jay on 1/7/17.
 */
import { PERSON_CUSTOM_REDUCERS } from '../config';
describe('ORGANISATION_CUSTOM_REDUCERS', () => {
  it('remove LOGIN_FORM on USERLOGOUT', () => {
    const state = fromJS({ name: 'ho ho', type: 'hi ho' });
    const newState = PERSON_CUSTOM_REDUCERS[USERLOGOUT](state);
    expect(newState.get('name')).toBe(undefined);
    expect(newState.get('type')).toBe(undefined);
  });
});
