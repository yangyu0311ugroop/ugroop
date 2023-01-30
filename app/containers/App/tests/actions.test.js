import { RESET_GLOBAL_ERROR } from '../constants';

import { resetError } from '../actions';

describe('App Actions', () => {
  describe('resetError', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: RESET_GLOBAL_ERROR,
      };
      expect(resetError()).toEqual(expectedResult);
    });
  });
});
