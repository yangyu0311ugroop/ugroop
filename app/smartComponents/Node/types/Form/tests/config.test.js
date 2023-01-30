import _ from 'lodash';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    it('should have attachmentId', () => {
      expect(CONFIG.value.attachmentId).toEqual(
        NODE_STORE_SELECTORS.attachmentId,
      );
    });
    it('should have requiresConsent', () => {
      expect(CONFIG.value.requiresConsent({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: 1,
          path: NODE_PATHS.requiresConsent,
        }),
      );
    });
    it('should have myId', () => {
      expect(CONFIG.value.myId).toEqual(COGNITO_STORE_SELECTORS.myId);
    });
    it('should have consentId', () => {
      expect(CONFIG.value.consentId).toEqual({
        keyPath: NODE_STORE_SELECTORS.children,
        props: null,
        getter: _.first,
      });
    });
  });
});
