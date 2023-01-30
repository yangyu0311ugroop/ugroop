/**
 * Test store addons
 */

import { USERLOGOUT } from 'containers/App/constants';
import { customReducer } from '../reducers';

describe('reducers', () => {
  describe('customReducer', () => {
    it('should contain USERLOGOUT', () => {
      expect(typeof customReducer[USERLOGOUT]).toBe('function');

      const store = { clear: jest.fn() };
      customReducer[USERLOGOUT](store);

      expect(store.clear).toBeCalledWith();
    });
  });
});
