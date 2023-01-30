import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

describe('config', () => {
  describe('value', () => {
    it('should have mode', () => {
      expect(CONFIG.value.mode({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: 1,
          path: NODE_PATHS.insuranceMode,
        }),
      );
    });
    it('should have userInsurancePolicy', () => {
      expect(CONFIG.value.userInsurancePolicy({ userId: 1 })).toEqual(
        USER_STORE_SELECTORS.insurancePolicy({ id: 1 }),
      );
    });
    it('should have value', () => {
      expect(CONFIG.value.value({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: 1,
          path: NODE_PATHS.insuranceValue,
        }),
      );
    });
    it('should have userPersonId', () => {
      expect(CONFIG.value.userPersonId({ userId: 1 })).toEqual(
        USER_STORE_SELECTORS.id({ userId: 1 }),
      );
    });
  });
});
