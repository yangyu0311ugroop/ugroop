/**
 * Created by paulcedrick on 7/11/17.
 */
import { Map } from 'immutable';
import reducer, { initialState } from '../reducer';
import {
  STATE_IS_REVEALED,
  STATE_SNACKBAR_TEXT,
  STATE_SNACKBAR_FADEOUT_TIME,
  UGSNACKBAR_DEFAULT_TIME,
} from '../constants';
import * as actions from '../actions';

describe('Snackbar reducer', () => {
  it('should return initial state for not supported action', () => {
    const result = reducer(undefined, { type: 'wawawawaawawa' });
    expect(result).toEqual(initialState);
  });
  it('should return the expected state when type: REVEAL_SNACKBAR', () => {
    const o = { text: 'God is good!' };
    const result = reducer(undefined, actions.revealSnackbar(o));
    const expectedResult = initialState.merge(
      Map({
        [STATE_IS_REVEALED]: true,
        [STATE_SNACKBAR_TEXT]: o.text,
        [STATE_SNACKBAR_FADEOUT_TIME]: UGSNACKBAR_DEFAULT_TIME,
      }),
    );
    expect(result).toEqual(expectedResult);
  });
  it('should return the expected state when type: REVEAL_SNACKBAR and fadeoutTime is 1000', () => {
    const o = { text: 'God is good!', fadeoutTime: 1000 };
    const result = reducer(undefined, actions.revealSnackbar(o));
    const expectedResult = initialState.merge(
      Map({
        [STATE_IS_REVEALED]: true,
        [STATE_SNACKBAR_TEXT]: o.text,
        [STATE_SNACKBAR_FADEOUT_TIME]: 1000,
      }),
    );
    expect(result).toEqual(expectedResult);
  });
  it('should return the expected state when type: HIDE_SNACKBAR', () => {
    const openState = reducer(
      undefined,
      actions.revealSnackbar({ text: 'qweqweqwe' }),
    );
    const result = reducer(openState, actions.hideSnackbar());
    const expectedResult = initialState.merge(
      Map({
        [STATE_IS_REVEALED]: false,
        [STATE_SNACKBAR_TEXT]: 'qweqweqwe',
      }),
    );
    expect(result).toEqual(expectedResult);
  });

  it('should return the expected state when type: RESET_SNACKBAR', () => {
    const openState = reducer(
      undefined,
      actions.revealSnackbar({ text: 'qweqweqwe', fadeoutTime: 2500 }),
    );
    const result = reducer(openState, actions.resetSnackbar());
    const expectedResult = initialState.merge(
      Map({
        [STATE_IS_REVEALED]: false,
        [STATE_SNACKBAR_TEXT]: '',
        [STATE_SNACKBAR_FADEOUT_TIME]: UGSNACKBAR_DEFAULT_TIME,
      }),
    );
    expect(result).toEqual(expectedResult);
  });
});
