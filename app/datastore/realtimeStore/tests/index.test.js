import { fromJS, Iterable } from 'immutable';

import reducer, { actions } from '../index';

describe('datastore/realtimeStore', () => {
  let state;

  beforeEach(() => {
    state = fromJS({});
  });

  it('returns immutable initial state', () => {
    expect(reducer(undefined, {})).toEqual(state);
    expect(Iterable.isIterable(state)).toBeTruthy();
  });

  describe('streamEvent action', () => {
    const change = fromJS({ category: 'someCategory' });
    const category = change.get('category');
    const action = actions.streamEvent(change);

    it('reducer sets specific category with change', () => {
      expect(reducer(state, action).get(category)).toEqual(change);
    });

    it('still matches snapshot', () => {
      expect(action).toMatchSnapshot();
    });
  });
  describe('streamCancel action', () => {
    const action = actions.streamCancel();

    it('reducer sets nothing', () => {
      expect(reducer(state, action)).toEqual(fromJS({}));
    });
    it('still matches snapshot', () => {
      expect(action).toMatchSnapshot();
    });
  });
  describe('streamError action', () => {
    const action = actions.streamError('someError');

    it('reducer sets nothing', () => {
      expect(reducer(state, action)).toEqual(fromJS({}));
    });
    it('still matches snapshot', () => {
      expect(action).toMatchSnapshot();
    });
  });
});
