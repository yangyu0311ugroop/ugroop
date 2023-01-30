import { TEMPLATE_MANAGEMENT_DATASTORE, NODE_STORE } from 'appConstants';
import { CONFIG, TEMPLATE_CONFIG } from '../config';
import { PUB_TAB_CONTENT } from '../components/PubTemplateTabs/components/PublicTabContent/config';

describe('Public Page config.test.js', () => {
  describe('config', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('CONFIG', () => {
    afterEach(() => jest.clearAllMocks());
    describe('value', () => {
      it('template id value', () => {
        expect(TEMPLATE_CONFIG.value.templateId()).toEqual([
          TEMPLATE_MANAGEMENT_DATASTORE,
          'id',
        ]);
      });
      it('currentQueryDayId', () => {
        expect(CONFIG.value.currentQueryDayId()).toEqual([
          PUB_TAB_CONTENT,
          'currentQueryDayId',
        ]);
      });
      it('createdBy', () => {
        const props = { templateId: 1 };
        expect(CONFIG.value.createdBy(props)).toEqual([
          NODE_STORE,
          'nodes',
          props.templateId,
          'createdBy',
        ]);
      });
      it('timelineIndex.keypath', () => {
        const props = { templateId: 1 };
        expect(CONFIG.value.timelineIndex.keyPath[0](props)).toEqual([
          NODE_STORE,
          'nodes',
          props.templateId,
          'calculated',
          'timelineId',
        ]);
        expect(CONFIG.value.timelineIndex.keyPath[1](props)).toEqual([
          NODE_STORE,
          'nodes',
          props.templateId,
          'visibleChildren',
        ]);
      });
      it('timelineIndex.getter return index', () => {
        expect(CONFIG.value.timelineIndex.getter(1, [1])).toEqual(0);
      });
      it('timelineIndex.getter return index -1', () => {
        expect(CONFIG.value.timelineIndex.getter([1])).toEqual(-1);
      });
    });
  });
});
