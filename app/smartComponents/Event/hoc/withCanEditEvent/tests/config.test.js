/**
 * Created by stephenkarpinskyj on 21/11/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/hoc/withCanEditEvent/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.createdBy).toEqual(NODE_STORE_SELECTORS.createdBy);
    });
  });
});
