import _ from 'lodash';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    describe('consentId', () => {
      it('should have keyPath', () => {
        expect(CONFIG.value.consentId.keyPath).toEqual(
          NODE_STORE_SELECTORS.children,
        );
      });
      it('should have props that is null', () => {
        expect(CONFIG.value.consentId.props).toEqual(null);
      });
      it('should have getter', () => {
        expect(CONFIG.value.consentId.getter).toEqual(_.first);
      });
    });

    it('should have myId', () => {
      expect(CONFIG.value.myId).toEqual(COGNITO_STORE_SELECTORS.myId);
    });
  });
});
