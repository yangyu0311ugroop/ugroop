/**
 * Created by paulcedrick on 7/11/17.
 */
import * as actions from '../actions';
import * as constants from '../constants';

describe('UGSnackbar Actions', () => {
  describe('revealSnackbar function', () => {
    it('should exist', () => {
      expect(actions.revealSnackbar).toBeDefined();
    });

    it('should return the expected object from it', () => {
      const o = { text: '', fadeoutTime: 1000 };
      const result = actions.revealSnackbar(o);
      const expectedResult = {
        type: constants.REVEAL_SNACKBAR,
        data: o,
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('hideSnackbar function', () => {
    it('should exist', () => {
      expect(actions.hideSnackbar).toBeDefined();
    });

    it('should return the expected object from it', () => {
      const result = actions.hideSnackbar();
      const expectedResult = {
        type: constants.HIDE_SNACKBAR,
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('resetSnackbar function', () => {
    it('should exist', () => {
      expect(actions.resetSnackbar).toBeDefined();
    });

    it('should return the expected object from it', () => {
      const result = actions.resetSnackbar();
      const expectedResult = {
        type: constants.RESET_SNACKBAR,
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
