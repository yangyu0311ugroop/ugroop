import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

import { CONFIG } from '../config';

describe('config', () => {
  describe('value', () => {
    it('should have value', () => {
      expect(CONFIG.value.value({ personId: 1 })).toEqual(
        PERSON_STORE_SELECTORS.personProp({ id: 1, path: PERSON_PATHS.gender }),
      );
    });
    it('should have userValue', () => {
      expect(CONFIG.value.userValue({ userId: 1 })).toEqual(
        USER_STORE_SELECTORS.gender({ id: 1 }),
      );
    });
  });
});
