import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

describe('config', () => {
  describe('value', () => {
    it('should have userPersonId', () => {
      expect(CONFIG.value.userPersonId).toEqual(USER_STORE_SELECTORS.id);
    });
    it('should have namePersonId', () => {
      expect(CONFIG.value.namePersonId({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: 1, path: NODE_PATHS.namePersonId }),
      );
    });
  });
});
