import { USER_SEE_MORE_DISABLED } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    it('should have seeMoreDisabled', () => {
      expect(CONFIG.value.seeMoreDisabled({ userId: 1 })).toEqual(
        USER_SEE_MORE_DISABLED({ id: 1 }),
      );
    });
  });
});
