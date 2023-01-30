import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    describe('userPhoneId', () => {
      it('should have keyPath', () => {
        expect(CONFIG.value.userPhoneId.keyPath[0]({ id: 1 })).toEqual(
          NODE_STORE_SELECTORS.nodeProp({
            id: 1,
            path: NODE_PATHS.userPhoneId,
          }),
        );
        expect(CONFIG.value.userPhoneId.keyPath[1]({ id: 1 })).toEqual(
          NODE_STORE_SELECTORS.nodeProp({
            id: 1,
            path: NODE_PATHS.phone,
          }),
        );
      });
      it('should have getter that returns 0', () => {
        expect(CONFIG.value.userPhoneId.getter(false, false)).toEqual(0);
      });
      it('should have getter that returns phoneid', () => {
        expect(CONFIG.value.userPhoneId.getter(1, 2)).toEqual(1);
      });
    });
  });
});
