/**
 * Created by Yang on 31/1/17.
 */
import { fromJS } from 'immutable';
import orgReducer from '../reducer';
import { putOrgSuccess } from '../actions';

describe('orgReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      org: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(orgReducer(undefined, {})).toEqual(expectedResult);
  });
  it('should set organsiation', () => {
    const fixture = fromJS({
      id: 1,
      name: 'something',
      namekey: 'something else',
    });
    const expectedResult = state.set('org', fixture);
    expect(orgReducer(state, putOrgSuccess(fixture))).toEqual(expectedResult);
  });
});
