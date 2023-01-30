/**
 * Created by stephenkarpinskyj on 4/11/18.
 */

import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Authentication/withAuthenticated/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.authenticated.keyPath).toEqual(
        COGNITO_STORE_SELECTORS.account,
      );
      expect(CONFIG.value.authenticated.getter(true)).toBe(true);
    });
  });
});
