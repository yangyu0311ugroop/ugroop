/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/parts/ParentNodeId/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = {
        id: 'id',
      };

      expect(CONFIG.value.value(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.parentNodeId,
        }),
      );
      expect(CONFIG.value.defaultValue).toEqual(
        TEMPLATE_MANAGEMENT_STORE_SELECTORS.tabId,
      );
    });
  });
});
