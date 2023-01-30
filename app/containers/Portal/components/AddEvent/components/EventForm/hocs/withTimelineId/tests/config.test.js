import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TAB_ID_CONFIG } from '../config';

describe('smartComponents/Event/hoc/withCanEditEvent/config', () => {
  describe('TAB_ID_CONFIG', () => {
    it('exists', () => {
      expect(TAB_ID_CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(TAB_ID_CONFIG.value.timelineId({ templateId: 11 })).toEqual(
        NODE_STORE_SELECTORS.calculatedTimelineId({ id: 11 }),
      );
    });
  });
});
