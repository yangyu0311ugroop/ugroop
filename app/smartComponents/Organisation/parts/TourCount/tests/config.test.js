import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    it('should have childrenArray', () => {
      expect(CONFIG.value.childrenArray({ id: 1 })).toEqual(
        ORGANISATION_STORE_SELECTORS.children({ id: 1 }),
      );
    });
  });
});
