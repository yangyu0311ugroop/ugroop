/**
 * Created by paulcedrick on 7/11/17.
 */
import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import {
  UGSNACKBAR_STATE_NAME,
  STATE_IS_REVEALED,
  STATE_SNACKBAR_TEXT,
  STATE_SNACKBAR_FADEOUT_TIME,
} from '../constants';
import * as selectors from '../selectors';

const state = fromJS({
  [UGSNACKBAR_STATE_NAME]: initialState,
});

describe('Snackbar selector', () => {
  describe('getSnackbarState', () => {
    it('should be defined', () => {
      expect(selectors.getSnackbarState).toBeDefined();
    });
    it('should get the snackbar state', () => {
      const result = selectors.getSnackbarState(state);
      const expectedResult = state.get('UGSnackbar');
      expect(result).toEqual(expectedResult);
    });
  });
  describe('getSnackbarIsRevealed', () => {
    it('should be defined', () => {
      expect(selectors.getSnackbarIsRevealed).toBeDefined();
    });
    it('should get the STATE_IS_REVEALED value', () => {
      const result = selectors.getSnackbarIsRevealed(state);
      const expectedResult = initialState.get(STATE_IS_REVEALED);
      expect(result).toEqual(expectedResult);
    });
  });
  describe('getSnackbarText', () => {
    it('should be defined', () => {
      expect(selectors.getSnackbarText).toBeDefined();
    });
    it('should get the STATE_SNACKBAR_TEXT value', () => {
      const result = selectors.getSnackbarText(state);
      const expectedResult = initialState.get(STATE_SNACKBAR_TEXT);
      expect(result).toEqual(expectedResult);
    });
  });
  describe('getSnackbarFadeoutTime', () => {
    it('should be defined', () => {
      expect(selectors.getSnackbarFadeoutTime).toBeDefined();
    });
    it('should get the STATE_SNACKBAR_FADEOUT_TIME value', () => {
      const result = selectors.getSnackbarFadeoutTime(state);
      const expectedResult = initialState.get(STATE_SNACKBAR_FADEOUT_TIME);
      expect(result).toEqual(expectedResult);
    });
  });
});
