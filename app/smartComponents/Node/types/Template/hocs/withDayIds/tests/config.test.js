/**
 * Created by stephenkarpinskyj on 21/11/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, TAB_ID_CONFIG } from '../config';

describe('smartComponents/Event/hoc/withDayIds/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });

    it('dayIds', () => {
      expect(CONFIG.value.dayIds({ tabId: 1123 })).toEqual(
        NODE_STORE_SELECTORS.children({ id: 1123 }),
      );
    });
  });

  describe('TAB_ID_CONFIG value', () => {
    it('tabId', () => {
      expect(TAB_ID_CONFIG.value.tabId({ templateId: 1123 })).toEqual(
        NODE_STORE_SELECTORS.calculatedTimelineId({ id: 1123 }),
      );
    });
  });
});
